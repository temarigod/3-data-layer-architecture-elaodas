import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProfileVM } from './profile.vm';

@Injectable()
export class ProfileService {
  public readonly vm$: Observable<ProfileVM>;

  constructor() {
    const loadingVm: ProfileVM = {
      profileData: null,
      profileDataError: false,
      profileDataIsLoading: true,
    };

    const errorVm: ProfileVM = {
      profileData: null,
      profileDataError: true,
      profileDataIsLoading: false,
    };

    const loadedVm: ProfileVM = {
      profileData: {
        age: 18,
        favoriteDogsCount: 2,
        name: 'Johnny Gold',
        favoriteDogsCountChangeInProgress: false,
      },
      profileDataError: false,
      profileDataIsLoading: false,
    };

    this.vm$ = of(loadedVm);
  }

  public retryLoad(): void {
    // TODO implement
  }
}
