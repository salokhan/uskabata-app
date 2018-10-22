import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';

import { CommentsComponent } from './comments/comments.component';
import { CommentComponent } from './comment/comment.component';
import { CommentBoxComponent } from './comment-box/comment-box.component';


@NgModule({
  imports: [
    CommonModule,
    TooltipModule
  ],
  declarations: [CommentsComponent, CommentComponent, CommentBoxComponent],
  exports: [CommentsComponent, CommentBoxComponent]
})
export class CommentModule { }
