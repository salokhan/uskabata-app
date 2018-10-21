import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommentService } from '../service-comment/comment.service';
import { IComment } from '../../comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  providers: [CommentService]
})
export class CommentsComponent implements OnInit {

  comments: IComment[];
  errorMessage: string;
  @Output() noOfComments: EventEmitter<number>  = new EventEmitter<number>();

  constructor(private _commentService: CommentService) { }

  ngOnInit() {
    this._commentService.getComments().subscribe(comments => {
      this.comments = comments;
      this.noOfComments.emit(this.comments.length ? this.comments.length : 0);

    },
    error => {
      this.errorMessage = <any>error;
    });
  }

}
