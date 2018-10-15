import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service-home/home.service';
import { ICity } from '../../../shared_modules/city';
import { ICategory } from '../../../shared_modules/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {

  cities: ICity[];
  categories: ICategory[];
  errorMessage;
  constructor(private _homeService: HomeService) { }

  ngOnInit() {
    this._homeService.getCities().subscribe(cities => {
      this.cities = cities;
    },
      error => {
        this.errorMessage = <any>error;
      });

    this._homeService.getCategories().subscribe(categories => {
      this.categories = categories;
    },
      error => {
        this.errorMessage = <any>error;
      });
  }

}
