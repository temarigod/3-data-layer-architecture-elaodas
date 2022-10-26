import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DogsComponent } from './dogs.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DogsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DogsRoutingModule {}
