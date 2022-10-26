import { createAction, props } from '@ngrx/store';
import { ProfileData } from './interfaces/profile-data.interface';

const feature = '[Profile]';

export const getProfileDataIfNeeded = createAction(
  `${feature} Get profile data if needed`
);
export const getProfileData = createAction(`${feature} Get profile data`);
export const getProfileDataSuccess = createAction(
  `${feature} Get profile data success`,
  props<{ profileData: ProfileData }>()
);
export const getProfileDataError = createAction(
  `${feature} Get profile data error`,
  props<{ error: string }>()
);

export const setDogAsFavorite = createAction(
  `${feature} Set dog as favorite`,
  props<{ dogId: string; favorite: boolean }>()
);
export const setDogAsFavoriteSuccess = createAction(
  `${feature} Set dog as favorite success`,
  props<{ dogId: string; favorite: boolean }>()
);
export const setDogAsFavoriteError = createAction(
  `${feature} Set dog as favorite error`,
  props<{ dogId: string; error: string }>()
);
