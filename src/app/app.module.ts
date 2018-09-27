import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { ResultsComponent } from './results/results.component';
import { ResultsListViewComponent } from './results/results-listview/results-listview.component';
import { ResultsGridviewComponent } from './results/results-gridview/results-gridview.component';
import { TopbarComponent } from './topbar/topbar.component';
import { PaginationComponent } from './results/shared/pagination/pagination.component';
import { ResultDetailComponent } from './results/result-detail/result-detail.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentComponent } from './comments/comment/comment.component';


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
    CommentComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
