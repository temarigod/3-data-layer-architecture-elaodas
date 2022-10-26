import { Dog } from './interfaces/dog.interface';

export interface DogsVM {
  dataIsLoading: boolean;
  dataLoadError: boolean;
  dogs: Dog[] | null;
}
