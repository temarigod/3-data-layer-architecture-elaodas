import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';
import {
  getProfileDataIfNeeded,
  setDogAsFavorite,
} from '../profile/store/profile.actions';
import { selectProfileDataLoadState } from '../profile/store/profile.selectors';
import { DogsVM } from './dogs.vm';
import { Dog } from './interfaces/dog.interface';
import { getDogsIfNeeded } from './store/dogs.actions';
import { selectDogsLoadState } from './store/dogs.selectors';

@Injectable()
export class DogsService {
  public readonly vm$: Observable<DogsVM>;

  constructor(private readonly store$: Store) {
    this.vm$ = combineLatest([
      this.store$.select(selectDogsLoadState),
      this.store$.select(selectProfileDataLoadState),
    ]).pipe(
      map(([dogsLoadState, profileDataLoadState]): DogsVM => {
        if (dogsLoadState.inProgress || profileDataLoadState.inProgress) {
          return {
            dataIsLoading: true,
            dataLoadError: false,
            dogs: null,
          };
        }

        if (dogsLoadState.error || profileDataLoadState.error) {
          return {
            dataIsLoading: false,
            dataLoadError: true,
            dogs: null,
          };
        }

        const dogs = dogsLoadState.dogs!;
        const profileData = profileDataLoadState.profileData!;

        return {
          dataIsLoading: false,
          dataLoadError: false,
          dogs: dogs.map((dog): Dog => {
            return {
              id: dog.id,
              imgSrc: dog.imgSrc,
              name: dog.name,
              favorite: profileData.favoriteDogIds.includes(dog.id),
              favoriteChangeInProgress:
                profileDataLoadState.dogIdsOfDogsUnderFavoriteChange.includes(
                  dog.id
                ),
            };
          }),
        };
      })
    );

    this.loadData();
  }

  public retryLoad(): void {
    this.loadData();
  }

  public setFavorite(dogId: string, newFavoriteValue: boolean): void {
    this.store$.dispatch(
      setDogAsFavorite({
        dogId,
        favorite: newFavoriteValue,
      })
    );
  }

  private loadData(): void {
    this.store$.dispatch(getDogsIfNeeded());
    this.store$.dispatch(getProfileDataIfNeeded());
  }
}
