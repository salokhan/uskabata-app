import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultsComponent } from './results/results.component';
import { ResultDetailComponent } from './result-detail/result-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ResultsComponent
  },
  {
    path: 'resultDetail',
    component: ResultDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsRoutingModule { }
