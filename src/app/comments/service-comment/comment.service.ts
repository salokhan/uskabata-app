import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IComment } from '../comment';

@Injectable()
export class CommentService {

  commentUrl = 'api/comments/comments.json';

  constructor(private _http: Http) { }

  private handleError(response: Response) {
    return Observable.throw(response.json().error() || 'server error');
  }

  getComments(): Observable<IComment[]> {
    return this._http.get(this.commentUrl).map((response: Response) =>
      <IComment[]>response.json()
    ).do(
      comments => console.log('comments ' + JSON.stringify(comments))
    ).catch (
      this.handleError
    );
  }
}
