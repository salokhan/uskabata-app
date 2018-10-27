import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ChipsModule} from 'primeng/chips';
import {AutoCompleteModule} from 'primeng/autocomplete';

import { UserRoutingModule } from './user-routing.module';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserGeneralDetailComponent } from './user-general-detail/user-general-detail.component';
import { UserService } from './service-user/user.service';
import { BaseDataSourcesService } from '../../shared_modules/base-ds-service';
import { UserQualificationDetailComponent } from './user-qualification-detail/user-qualification-detail.component';
import { UserWorkDetailComponent } from './user-work-detail/user-work-detail.component';
import { CustomformVaidatorsService } from '../../shared_modules/form-validators/custom-form-validators-service';
import { StartendyearModule } from '../../shared_modules/startendyear/startendyear.module';




@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    InputSwitchModule,
    DropdownModule,
    ChipsModule,
    AutoCompleteModule,
    StartendyearModule
  ],
  declarations: [UserProfileComponent, UserGeneralDetailComponent, UserWorkDetailComponent, UserQualificationDetailComponent],
  providers: [UserService, BaseDataSourcesService, CustomformVaidatorsService]
})
export class UserModule { }
