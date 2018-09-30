import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { AppComponent } from './app.component';
import { ResultsComponent } from './results/results.component';
import { ResultsListViewComponent } from './results/results-listview/results-listview.component';
import { ResultsGridviewComponent } from './results/results-gridview/results-gridview.component';
import { TopbarComponent } from './topbar/topbar.component';
import { PaginationComponent } from './results/shared/pagination/pagination.component';
import { ResultDetailComponent } from './results/result-detail/result-detail.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentComponent } from './comments/comment/comment.component';
import { CommentBoxComponent } from './comments/comment-box/comment-box.component';
import { RatingComponent } from './shared/rating/rating.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const routes: Routes = [
  {
    path: '',
    component: ResultsComponent
  },
  {
    path: 'result-detail',
    component: ResultDetailComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ResultsComponent,
    ResultsListViewComponent,
    ResultsGridviewComponent,
    TopbarComponent,
    PaginationComponent,
    ResultDetailComponent,
    CommentsComponent,
    CommentComponent,
    CommentBoxComponent,
    RatingComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    PerfectScrollbarModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
