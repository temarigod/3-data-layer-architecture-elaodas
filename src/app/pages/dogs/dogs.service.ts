import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DogsVM } from './dogs.vm';

@Injectable()
export class DogsService {
  public readonly vm$: Observable<DogsVM>;

  constructor() {
    const loadingVm: DogsVM = {
      dataIsLoading: true,
      dataLoadError: false,
      dogs: null,
    };

    const errorVm: DogsVM = {
      dataIsLoading: false,
      dataLoadError: true,
      dogs: null,
    };

    const loadedVm: DogsVM = {
      dataIsLoading: false,
      dataLoadError: false,
      dogs: [
        {
          id: '1',
          name: 'Beagle',
          imgSrc: '/assets/images/beagle.jpg',
          favorite: true,
          favoriteChangeInProgress: false,
        },
        {
          id: '2',
          name: 'Mastiff',
          imgSrc: '/assets/images/mastiff.jpg',
          favorite: false,
          favoriteChangeInProgress: false,
        },
        {
          id: '3',
          name: 'Pug',
          imgSrc: '/assets/images/pug.jpg',
          favorite: false,
          favoriteChangeInProgress: false,
        },
        {
          id: '4',
          name: 'Shiba inu',
          imgSrc: '/assets/images/shiba-inu.jpg',
          favorite: false,
          favoriteChangeInProgress: true,
        },
      ],
    };

    this.vm$ = of(loadedVm);
  }

  public retryLoad(): void {
    // TODO implement
  }

  public setFavorite(dogId: string, newFavoriteValue: boolean): void {
    // TODO implement
  }
}
