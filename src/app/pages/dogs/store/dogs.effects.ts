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
        return this.getMockDogs$().pipe(
          map((dogs) => {
            return getDogsSuccess({
              dogs,
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
    private readonly store: Store
  ) {}

  private getMockDogs$(): Observable<Dog[]> {
    return timer(2000).pipe(
      map((): Dog[] => {
        return [
          {
            id: '1',
            imgSrc: '/assets/images/beagle.jpg',
            name: 'Beagle',
          },
          {
            id: '2',
            imgSrc: '/assets/images/mastiff.jpg',
            name: 'Mastiff',
          },
          {
            id: '3',
            imgSrc: '/assets/images/pug.jpg',
            name: 'Pug',
          },
          {
            id: '4',
            imgSrc: '/assets/images/shiba-inu.jpg',
            name: 'Shiba inu',
          },
        ];
      })
    );
  }
}
