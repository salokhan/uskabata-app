import { Component, OnInit, Input } from '@angular/core';
import { IComment } from '../comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: IComment;

  constructor() { }

  ngOnInit() {
  }

}
