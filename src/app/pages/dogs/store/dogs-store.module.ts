import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DogsEffects } from './dogs.effects';
import { featureKeyDogs, reducerDogs } from './dogs.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(featureKeyDogs, reducerDogs),
    EffectsModule.forFeature([DogsEffects]),
  ],
  exports: [StoreModule],
})
export class DogsStoreModule {}
