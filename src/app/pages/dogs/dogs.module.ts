import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LetModule } from '@ngrx/component';
import { DogsRoutingModule } from './dogs-routing.module';
import { DogsComponent } from './dogs.component';
import { DogComponent } from './components/dog/dog.component';

@NgModule({
  declarations: [DogsComponent, DogComponent],
  imports: [DogsRoutingModule, LetModule, CommonModule],
})
export class DogsModule {}
