import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, combineLatest, map, mergeMap, of, switchMap } from 'rxjs';
import { ProfileDataApiService } from 'src/app/api/services/profile-data-api.service';
import { noopAction } from 'src/app/root.actions';
import {
  getProfileData,
  getProfileDataError,
  getProfileDataIfNeeded,
  getProfileDataSuccess,
  setDogAsFavorite,
  setDogAsFavoriteError,
  setDogAsFavoriteSuccess,
} from './profile.actions';
import {
  selectProfileData,
  selectProfileDataLoadInProgress,
} from './profile.selectors';

@Injectable()
export class ProfileEffects {
  public getProfileDataIfNeeded$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getProfileDataIfNeeded),
      concatLatestFrom(() =>
        combineLatest([
          this.store.select(selectProfileDataLoadInProgress),
          this.store.select(selectProfileData),
        ])
      ),
      map(([_, [isLoading, result]]) => {
        if (isLoading || result) {
          return noopAction();
        }

        return getProfileData();
      })
    );
  });

  public getProfileData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getProfileData),
      switchMap(() => {
        return this.profileDataApiService.getProfileData$().pipe(
          map((profileData) => {
            return getProfileDataSuccess({
              profileData: {
                birthDate: profileData.birth_date,
                favoriteDogIds: profileData.favorite_dog_ids,
                firstName: profileData.first_name,
                lastName: profileData.last_name,
              },
            });
          }),
          catchError((err) => {
            console.error(err);

            return of(
              getProfileDataError({
                error: 'error',
              })
            );
          })
        );
      })
    );
  });

  public setDogAsFavorite$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setDogAsFavorite),
      mergeMap(({ dogId, favorite }) => {
        return this.profileDataApiService.setDogFavorite$(dogId, favorite).pipe(
          map(() => {
            return setDogAsFavoriteSuccess({
              dogId,
              favorite,
            });
          }),
          catchError((err) => {
            console.error(err);

            return of(
              setDogAsFavoriteError({
                dogId,
                error: 'error',
              })
            );
          })
        );
      })
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly profileDataApiService: ProfileDataApiService
  ) {}
}
