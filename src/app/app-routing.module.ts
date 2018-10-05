import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'results',
    loadChildren: '../app/feature_modules/results/results.module#ResultsModule'
  },
  {
    path: 'customers',
    loadChildren: '../app/customers/customers.module#CustomersModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
