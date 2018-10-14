import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { ICity } from '../../../shared_modules/city';

@Injectable()
export class HomeService {

  citiesUrl = 'api/cities/cities.json';

  constructor(private _http: Http) { }

  private handleError(response: Response) {
    return Observable.throw(response.json().error || 'Server Error');
  }

  getCities(): Observable<ICity[]> {
    return this._http.get(this.citiesUrl).map((response: Response) =>
      <ICity[]>response.json()
    ).do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }
}
