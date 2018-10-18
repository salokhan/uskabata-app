import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsComponent } from './results/results.component';
import { ResultsListViewComponent } from './results-listview/results-listview.component';
import { ResultsGridviewComponent } from './results-gridview/results-gridview.component';
import { ResultDetailComponent } from './result-detail/result-detail.component';

import { ResultsRoutingModule } from './results-routing.module';
import { RatingModule } from '../../shared_modules/rating/rating.module';
import { PaginationModule } from '../../shared_modules/pagination/pagination.module';
import { CommentModule } from '../../shared_modules/comment/comment.module';

import { ResultService } from './service-result/result.service';




@NgModule({
  imports: [
    CommonModule,
    ResultsRoutingModule,
    RatingModule,
    PaginationModule,
    CommentModule
  ],
  providers: [ResultService],
  declarations: [ResultsComponent, ResultsListViewComponent, ResultsGridviewComponent, ResultDetailComponent]
})
export class ResultsModule { }
