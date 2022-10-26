import { NgModule } from '@angular/core';
import { DogsRoutingModule } from './dogs-routing.module';
import { DogsComponent } from './dogs.component';

@NgModule({
  declarations: [DogsComponent],
  imports: [DogsRoutingModule],
})
export class DogsModule {}
