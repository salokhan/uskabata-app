import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ChipsModule} from 'primeng/chips';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {DialogModule} from 'primeng/dialog';

import { UserRoutingModule } from './user-routing.module';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserService } from './service-user/user.service';
import { BaseDataSourcesService } from '../../shared_modules/base-ds-service';
import { UserQualificationDetailComponent } from './user-qualification-detail/user-qualification-detail.component';
import { CustomformVaidatorsService } from '../../shared_modules/form-validators/custom-form-validators-service';
import { StartendyearModule } from '../../shared_modules/startendyear/startendyear.module';
import { StartendtimeModule } from '../../shared_modules/startendtime/startendtime.module';
import { UserGeneralDetailFormComponent } from './user-general-detail-form/user-general-detail-form.component';
import { UserProfessionalDetailFormComponent } from './user-professional-detail-form/user-professional-detail-form.component';
import { UserWorkPlaceDetailFormComponent } from './user-work-place-detail-form/user-work-place-detail-form.component';




@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    InputSwitchModule,
    DropdownModule,
    ChipsModule,
    AutoCompleteModule,
    StartendyearModule,
    StartendtimeModule,
    DialogModule
  ],
  declarations: [UserProfileComponent, UserGeneralDetailFormComponent,
     UserProfessionalDetailFormComponent, UserWorkPlaceDetailFormComponent,
     UserQualificationDetailComponent],
  providers: [UserService, BaseDataSourcesService, CustomformVaidatorsService]
})
export class UserModule { }
