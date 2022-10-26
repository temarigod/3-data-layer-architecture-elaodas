import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';
import { ProfileVM } from './profile.vm';
import { getProfileDataIfNeeded } from './store/profile.actions';
import {
  selectDogIdsOfDogsUnderFavoriteChange,
  selectProfileData,
  selectProfileDataLoadError,
  selectProfileDataLoadInProgress,
} from './store/profile.selectors';

@Injectable()
export class ProfileService {
  public readonly vm$: Observable<ProfileVM>;

  constructor(private readonly store$: Store) {
    this.vm$ = combineLatest([
      this.store$.select(selectProfileDataLoadInProgress),
      this.store$.select(selectProfileDataLoadError),
      this.store$.select(selectProfileData),
      this.store$.select(selectDogIdsOfDogsUnderFavoriteChange),
    ]).pipe(
      map(
        ([
          profileDataLoadInProgress,
          profileDataLoadError,
          profileData,
          dogIdsOfDogsUnderFavoriteChange,
        ]): ProfileVM => {
          return {
            profileData:
              (profileData && {
                age: this.getAge(profileData.birthDate),
                favoriteDogsCount: profileData.favoriteDogIds.length,
                favoriteDogsCountChangeInProgress:
                  !!dogIdsOfDogsUnderFavoriteChange.length,
                name: `${profileData.firstName} ${profileData.lastName}`,
              }) ??
              null,
            profileDataIsLoading: profileDataLoadInProgress,
            profileDataError: !!profileDataLoadError,
          };
        }
      )
    );

    this.loadData();
  }

  public retryLoad(): void {
    this.loadData();
  }

  private loadData(): void {
    this.store$.dispatch(getProfileDataIfNeeded());
  }

  private getAge(dateString: string): number {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
