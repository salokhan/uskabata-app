import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { ResultsComponent } from './results.component';
import { ResultsListViewComponent } from './results-listview/results-listview.component';
import { ResultsGridviewComponent } from './results-gridview/results-gridview.component';

import { ResultsRoutingModule } from './results-routing.module';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { RatingModule } from '../../shared_modules/rating/rating.module';

@NgModule({
  imports: [
    CommonModule,
    ResultsRoutingModule,
    RatingModule
  ],
  declarations: [ResultsComponent, ResultsListViewComponent, ResultsGridviewComponent, PaginationComponent]
})
export class ResultsModule { }
