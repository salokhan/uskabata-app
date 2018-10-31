import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { LoginComponent } from './login/login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: 'profile',
    component: UserProfileComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
