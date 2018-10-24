import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/components/common/messageservice';

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
    DropdownModule,
    MessagesModule
  ],
  declarations: [UserProfileComponent, UserGeneralProfileComponent, UserWorkProfileComponent],
  providers: [UserService, BaseDataSourcesService, MessageService]
})
export class UserModule { }
