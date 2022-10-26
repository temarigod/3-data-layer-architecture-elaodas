import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  combineLatest,
  map,
  Observable,
  of,
  switchMap,
  timer,
} from 'rxjs';
import { noopAction } from 'src/app/root.actions';
import { ProfileData } from './interfaces/profile-data.interface';
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
        return this.getMockProfileData$().pipe(
          map((profileData) => {
            return getProfileDataSuccess({
              profileData,
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
      switchMap(({ dogId, favorite }) => {
        return this.setMockDogAsFavorite$(dogId, favorite).pipe(
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
    private readonly store: Store
  ) {}

  private getMockProfileData$(): Observable<ProfileData> {
    return timer(2000).pipe(
      map((): ProfileData => {
        return {
          birthDate: '1995-01-01',
          favoriteDogIds: ['1'],
          firstName: 'John',
          lastName: 'Doe',
        };
      })
    );
  }

  private setMockDogAsFavorite$(
    dogId: string,
    favorite: boolean
  ): Observable<void> {
    return timer(2000).pipe(map(() => void 0));
  }
}
