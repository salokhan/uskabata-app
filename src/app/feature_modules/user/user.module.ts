import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ChipsModule} from 'primeng/chips';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {DialogModule} from 'primeng/dialog';

import { UserRoutingModule } from './user-routing.module';

import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { UserService } from './service-user/user.service';
import { BaseDataSourcesService } from '../../shared_modules/base-ds-service';
import { CustomformVaidatorsService } from '../../shared_modules/form-validators/custom-form-validators-service';
import { StartendyearModule } from '../../shared_modules/startendyear/startendyear.module';
import { UserGeneralDetailFormComponent } from './profile/user-general-detail-form/user-general-detail-form.component';
import { UserProfessionalDetailFormComponent } from './profile/user-professional-detail-form/user-professional-detail-form.component';
import { UserWorkPlaceDetailFormComponent } from './profile/user-work-place-detail-form/user-work-place-detail-form.component';
import { UserQualificationDetailFormComponent } from './profile/user-qualification-detail-form/user-qualification-detail-form.component';
import { StartendtimeModule } from '../../shared_modules/startendtime/startendtime.module';
import { LoginComponent } from './login/login/login.component';
import { SignupComponent } from './signup/signup.component';




@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    InputSwitchModule,
    DropdownModule,
    ChipsModule,
    AutoCompleteModule,
    StartendtimeModule,
    StartendyearModule,
    DialogModule
  ],
  declarations: [UserProfileComponent, UserGeneralDetailFormComponent,
     UserProfessionalDetailFormComponent, UserWorkPlaceDetailFormComponent,
     UserQualificationDetailFormComponent,
     LoginComponent, SignupComponent],
  providers: [UserService, BaseDataSourcesService, CustomformVaidatorsService]
})
export class UserModule { }
