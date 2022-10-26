import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LetModule } from '@ngrx/component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileStoreModule } from './store/profile-store.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [ProfileRoutingModule, LetModule, CommonModule, ProfileStoreModule],
})
export class ProfileModule {}
