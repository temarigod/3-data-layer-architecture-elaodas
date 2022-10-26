import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LetModule } from '@ngrx/component';
import { ProfileStoreModule } from '../profile/store/profile-store.module';
import { DogComponent } from './components/dog/dog.component';
import { DogsRoutingModule } from './dogs-routing.module';
import { DogsComponent } from './dogs.component';
import { DogsStoreModule } from './store/dogs-store.module';

@NgModule({
  declarations: [DogsComponent, DogComponent],
  imports: [
    DogsRoutingModule,
    LetModule,
    CommonModule,
    DogsStoreModule,
    ProfileStoreModule,
  ],
})
export class DogsModule {}
