import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ICountry } from '../../../shared_modules/country';
import { ICity } from '../../../shared_modules/city';

@Injectable()
export class UserService {

  countriesUrl = 'api/countries/countries.json';
  citiesUrl = 'api/cities/cities.json';

  constructor(private _http: Http) { }

  private handleError(response: Response) {
    return Observable.throw(response.json().error() || 'Server Error');
  }

  getCountries(): Observable<ICountry[]> {
    return this._http.get(this.countriesUrl).map((response: Response) =>
      <ICountry[]>response.json()
    ).do(data => console.log('All : ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getCities(): Observable<ICity[]> {
    return this._http.get(this.citiesUrl).map((response: Response) =>
      <ICity[]>response.json()
    ).do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

}
