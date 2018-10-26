import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ChipsModule} from 'primeng/chips';

import { UserRoutingModule } from './user-routing.module';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserGeneralDetailComponent } from './user-general-detail/user-general-detail.component';
import { UserService } from './service-user/user.service';
import { BaseDataSourcesService } from '../../shared_modules/base-ds-service';
import { UserWorkProfileComponent } from './user-work-profile/user-work-profile.component';
import { UserQualificationDetailComponent } from './user-qualification-detail/user-qualification-detail.component';




@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    InputSwitchModule,
    DropdownModule,
    ChipsModule
  ],
  declarations: [UserProfileComponent, UserGeneralDetailComponent, UserWorkProfileComponent, UserQualificationDetailComponent],
  providers: [UserService, BaseDataSourcesService]
})
export class UserModule { }
