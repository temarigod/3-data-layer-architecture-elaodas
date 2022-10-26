import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProfileEffects } from './profile.effects';
import { featureKeyProfile, reducerProfile } from './profile.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(featureKeyProfile, reducerProfile),
    EffectsModule.forFeature([ProfileEffects]),
  ],
  exports: [StoreModule],
})
export class ProfileStoreModule {}
