import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKeyProfile, FeatureStateProfile } from './profile.reducer';

const selectProfileFeature =
  createFeatureSelector<FeatureStateProfile>(featureKeyProfile);

export const selectProfileDataLoadInProgress = createSelector(
  selectProfileFeature,
  (state) => state.profileDataLoadInProgress
);
export const selectProfileDataLoadError = createSelector(
  selectProfileFeature,
  (state) => state.profileDataLoadError
);
export const selectProfileData = createSelector(
  selectProfileFeature,
  (state) => state.profileData
);
export const selectDogIdsOfDogsUnderFavoriteChange = createSelector(
  selectProfileFeature,
  (state) => state.dogIdsOfDogsUnderFavoriteChange
);
