import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ICountry } from '../../../shared_modules/country';
import { ICity } from '../../../shared_modules/city';
import { ICategory } from '../../../shared_modules/category';
import { ISchool } from '../../../shared_modules/school';

@Injectable()
export class UserService {

  countriesUrl = 'api/countries/countries.json';
  citiesUrl = 'api/cities/cities.json';
  categoriesUrl = 'api/categories/categories.json';
  schoolsUrl = 'api/schools/schools.json';

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

  getSchools(): Observable<ISchool[]> {
    return this._http.get(this.schoolsUrl).map((response: Response) =>
      <ISchool[]>response.json()
    ).do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getCategories(): Observable<ICategory[]> {
    return this._http.get(this.categoriesUrl).map((response: Response) =>
      <ICategory[]>response.json()
    ).do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

}
