import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { ResultsComponent } from './results.component';
import { ResultsListViewComponent } from './results-listview/results-listview.component';
import { ResultsGridviewComponent } from './results-gridview/results-gridview.component';

import { ResultsRoutingModule } from './results-routing.module';
// import { PaginationComponent } from './shared/pagination/pagination.component';
import { RatingModule } from '../../shared_modules/rating/rating.module';
import { PaginationModule } from '../../shared_modules/pagination/pagination.module';
import { ResultService } from './service-result/result.service';
import { PaginationService } from '../../shared_modules/pagination/pagination.service';

@NgModule({
  imports: [
    CommonModule,
    ResultsRoutingModule,
    RatingModule,
    PaginationModule
  ],
  providers: [ResultService, PaginationService],
  declarations: [ResultsComponent, ResultsListViewComponent, ResultsGridviewComponent]
})
export class ResultsModule { }
