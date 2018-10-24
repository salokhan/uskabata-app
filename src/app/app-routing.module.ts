import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: '../app/feature_modules/home/home.module#HomeModule'
  },
  {
    path: 'results',
    loadChildren: '../app/feature_modules/results/results.module#ResultsModule'
  },
  {
    path: 'user',
    loadChildren: '../app/feature_modules/user/user.module#UserModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
