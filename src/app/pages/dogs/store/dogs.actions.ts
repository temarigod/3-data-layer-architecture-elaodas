import { createAction, props } from '@ngrx/store';
import { Dog } from './interfaces/dog.interface';

const feature = '[Dogs]';

export const getDogsIfNeeded = createAction(`${feature} Get dogs if needed`);
export const getDogs = createAction(`${feature} Get dogs`);
export const getDogsSuccess = createAction(
  `${feature} Get dogs success`,
  props<{ dogs: Dog[] }>()
);
export const getDogsError = createAction(
  `${feature} Get dogs error`,
  props<{ error: string }>()
);
