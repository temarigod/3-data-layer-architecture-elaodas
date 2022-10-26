import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { of } from 'rxjs';
import { LandingModule } from './pages/landing/landing.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => of(LandingModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'dogs',
    loadChildren: () =>
      import('./pages/dogs/dogs.module').then((m) => m.DogsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
