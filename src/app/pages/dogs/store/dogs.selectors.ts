import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKeyDogs, FeatureStateDogs } from './dogs.reducer';

const selectDogsFeature =
  createFeatureSelector<FeatureStateDogs>(featureKeyDogs);

export const selectDogsLoadInProgress = createSelector(
  selectDogsFeature,
  (state) => state.dogsLoadInProgress
);
export const selectDogs = createSelector(
  selectDogsFeature,
  (state) => state.dogs
);
export const selectDogsLoadState = createSelector(
  selectDogsFeature,
  (state) => {
    return {
      inProgress: state.dogsLoadInProgress,
      error: state.dogsLoadError,
      dogs: state.dogs,
    };
  }
);
