import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';

import {DropdownModule} from 'primeng/dropdown';

import { UserRoutingModule } from './user-routing.module';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserService } from './service-user/user.service';



@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    DropdownModule
  ],
  declarations: [UserProfileComponent],
  providers: [UserService]
})
export class UserModule { }
