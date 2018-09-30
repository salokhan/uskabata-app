import { Component, OnInit } from '@angular/core';
import { CommentService } from './service-comment/comment.service';
import { IComment } from './comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  providers: [CommentService]
})
export class CommentsComponent implements OnInit {

  comments: IComment[];
  errorMessage: string;

  constructor(private _commentService: CommentService) { }

  ngOnInit() {
    this._commentService.getComments().subscribe(comments => {
      this.comments = comments;

    },
    error => {
      this.errorMessage = <any>error;
    });
  }

}
