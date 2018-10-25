import { Component, OnInit } from '@angular/core';
import { UserService } from '../service-user/user.service';
import { ICountry } from '../../../shared_modules/country';
import { ICity } from '../../../shared_modules/city';
import { ICategory } from '../../../shared_modules/category';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  errorMessage: string;

  countries: ICountry[];
  countriesDS = [];
  cities: ICity[];
  citiesDS = [];
  categories: ICategory[];
  categoryDS = [];

  constructor(private _userService: UserService) { }

  ngOnInit() {

    this._userService.getCountries().subscribe(countries => {
      this.countries = countries;
      countries.forEach(country => {
        this.countriesDS.push({ label: country.name, value: { name: country.name, code: country.code } });
      });
    },
      error => {
        this.errorMessage = error;
      });

    this._userService.getCities().subscribe(cities => {
      this.cities = cities;
      cities.forEach(city => {
        this.citiesDS.push({ label: city.name, value: { name: city.name } });
      });

    },
      error => {
        this.errorMessage = error;
      });

    this._userService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.categoryDS.push({ label: 'Other', value: { name: 'Other', experties: 'Other' } });
      categories.forEach(category => {
        this.categoryDS.push({ label: category.name, value: { name: category.name, experties: category.experties } });
      });
    },
      error => {
        this.errorMessage = <any>error;
      });

  }

}
