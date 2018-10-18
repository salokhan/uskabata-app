import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsComponent } from './comments/comments.component';
import { CommentComponent } from './comment/comment.component';
import { CommentBoxComponent } from './comment-box/comment-box.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    PerfectScrollbarModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  declarations: [CommentsComponent, CommentComponent, CommentBoxComponent],
  exports: [CommentsComponent]
})
export class CommentModule { }
