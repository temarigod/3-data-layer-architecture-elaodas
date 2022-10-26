import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, combineLatest, map, of, switchMap } from 'rxjs';
import { DogsApiService } from 'src/app/api/services/dogs-api.service';
import { noopAction } from 'src/app/root.actions';
import {
  getDogs,
  getDogsError,
  getDogsIfNeeded,
  getDogsSuccess,
} from './dogs.actions';
import { selectDogs, selectDogsLoadInProgress } from './dogs.selectors';
import { Dog } from './interfaces/dog.interface';

@Injectable()
export class DogsEffects {
  public getDogsIfNeeded$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getDogsIfNeeded),
      concatLatestFrom(() =>
        combineLatest([
          this.store.select(selectDogsLoadInProgress),
          this.store.select(selectDogs),
        ])
      ),
      map(([_, [isLoading, result]]) => {
        if (isLoading || result) {
          return noopAction();
        }

        return getDogs();
      })
    );
  });

  public getDogs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getDogs),
      switchMap(() => {
        return this.dogsApiService.getDogs$().pipe(
          map((dogs) => {
            return getDogsSuccess({
              dogs: dogs.map((dog): Dog => {
                return {
                  id: dog.id,
                  imgSrc: dog.img_src,
                  name: dog.name,
                };
              }),
            });
          }),
          catchError((err) => {
            console.error(err);

            return of(
              getDogsError({
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
    private readonly dogsApiService: DogsApiService
  ) {}
}
