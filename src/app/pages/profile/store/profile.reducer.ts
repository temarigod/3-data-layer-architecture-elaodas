import { createReducer, on } from '@ngrx/store';
import { ProfileData } from './interfaces/profile-data.interface';
import {
  getProfileData,
  getProfileDataError,
  getProfileDataSuccess,
  setDogAsFavorite,
  setDogAsFavoriteError,
  setDogAsFavoriteSuccess,
} from './profile.actions';

export const featureKeyProfile = 'profile';

export interface FeatureStateProfile {
  profileDataLoadInProgress: boolean;
  profileDataLoadError: string | null;
  profileData: ProfileData | null;
  dogIdsOfDogsUnderFavoriteChange: string[];
}

export interface AppState {
  [featureKeyProfile]: FeatureStateProfile;
}

export const featureStateProfile: FeatureStateProfile = {
  profileDataLoadInProgress: false,
  profileDataLoadError: null,
  profileData: null,
  dogIdsOfDogsUnderFavoriteChange: [],
};

export const reducerProfile = createReducer(
  featureStateProfile,
  on(
    getProfileData,
    (state): FeatureStateProfile => ({
      ...state,
      profileDataLoadInProgress: true,
      profileDataLoadError: null,
    })
  ),
  on(
    getProfileDataSuccess,
    (state, { profileData }): FeatureStateProfile => ({
      ...state,
      profileDataLoadInProgress: false,
      profileData,
    })
  ),
  on(
    getProfileDataError,
    (state, { error }): FeatureStateProfile => ({
      ...state,
      profileDataLoadInProgress: false,
      profileDataLoadError: error,
    })
  ),
  on(
    setDogAsFavorite,
    (state, { dogId }): FeatureStateProfile => ({
      ...state,
      dogIdsOfDogsUnderFavoriteChange: [
        ...state.dogIdsOfDogsUnderFavoriteChange,
        dogId,
      ],
    })
  ),
  on(
    setDogAsFavoriteSuccess,
    (state, { dogId, favorite }): FeatureStateProfile => {
      const newProfileData: ProfileData = {
        ...state.profileData!,
      };

      if (favorite) {
        newProfileData.favoriteDogIds = [
          ...newProfileData.favoriteDogIds,
          dogId,
        ];
      } else {
        newProfileData.favoriteDogIds = newProfileData.favoriteDogIds.filter(
          (id) => id !== dogId
        );
      }

      return {
        ...state,
        dogIdsOfDogsUnderFavoriteChange:
          state.dogIdsOfDogsUnderFavoriteChange.filter((id) => id !== dogId),
        profileData: newProfileData,
      };
    }
  ),
  on(setDogAsFavoriteError, (state, { dogId }): FeatureStateProfile => {
    return {
      ...state,
      dogIdsOfDogsUnderFavoriteChange:
        state.dogIdsOfDogsUnderFavoriteChange.filter((id) => id !== dogId),
    };
  })
);
