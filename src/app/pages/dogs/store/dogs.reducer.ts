import { createReducer, on } from '@ngrx/store';
import { getDogs, getDogsError, getDogsSuccess } from './dogs.actions';
import { Dog } from './interfaces/dog.interface';

export const featureKeyDogs = 'dogs';

export interface FeatureStateDogs {
  dogsLoadInProgress: boolean;
  dogsLoadError: string | null;
  dogs: Dog[] | null;
}

export interface AppState {
  [featureKeyDogs]: FeatureStateDogs;
}

export const featureStateDogs: FeatureStateDogs = {
  dogsLoadInProgress: false,
  dogsLoadError: null,
  dogs: null,
};

export const reducerDogs = createReducer(
  featureStateDogs,
  on(
    getDogs,
    (state): FeatureStateDogs => ({
      ...state,
      dogsLoadInProgress: true,
      dogsLoadError: null,
    })
  ),
  on(
    getDogsSuccess,
    (state, { dogs }): FeatureStateDogs => ({
      ...state,
      dogsLoadInProgress: false,
      dogs,
    })
  ),
  on(
    getDogsError,
    (state, { error }): FeatureStateDogs => ({
      ...state,
      dogsLoadInProgress: false,
      dogsLoadError: error,
    })
  )
);
