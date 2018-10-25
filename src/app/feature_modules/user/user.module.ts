import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';

import { UserRoutingModule } from './user-routing.module';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserGeneralProfileComponent } from './user-general-profile/user-general-profile.component';
import { UserService } from './service-user/user.service';
import { BaseDataSourcesService } from '../../shared_modules/base-ds-service';
import { UserWorkProfileComponent } from './user-work-profile/user-work-profile.component';




@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    InputSwitchModule,
    DropdownModule,
  ],
  declarations: [UserProfileComponent, UserGeneralProfileComponent, UserWorkProfileComponent],
  providers: [UserService, BaseDataSourcesService]
})
export class UserModule { }
