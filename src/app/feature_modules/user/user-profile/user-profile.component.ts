import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../service-user/user.service';
import { ICountry } from '../../../shared_modules/country';
import { ICity } from '../../../shared_modules/city';
import { ICategory } from '../../../shared_modules/category';
import { IExperty } from '../../../shared_modules/experty';
import { ISchool } from '../../../shared_modules/school';
import { IUserProfile } from '../../../shared_modules/userProfile';
import { UserGeneralDetailFormComponent } from '../user-general-detail-form/user-general-detail-form.component';
import { UserProfessionalDetailFormComponent } from '../user-professional-detail-form/user-professional-detail-form.component';
import { UserWorkPlaceDetailFormComponent } from '../user-work-place-detail-form/user-work-place-detail-form.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @ViewChild(UserGeneralDetailFormComponent)
  private userGeneralDetailFormComponent: UserGeneralDetailFormComponent;

  @ViewChild(UserProfessionalDetailFormComponent)
  private userProfessionalDetailFormComponent: UserProfessionalDetailFormComponent;

  @ViewChild(UserWorkPlaceDetailFormComponent)
  private userWorkPlaceDetailFormComponent: UserWorkPlaceDetailFormComponent;

  errorMessage: string;

  countries: ICountry[];
  countriesDS = [];
  cities: ICity[];
  citiesDS = [];
  categories: ICategory[];
  categoryDS = [];
  schools: ISchool[];
  userProfiles: IUserProfile[];
  userProfile: IUserProfile;

  showGeneralDetailForm = false;
  showProfessionalDetailForm = false;
  showWorkPlaceDetailForm = false;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this._userService.getUserProfile().subscribe(userProfiles => {
      this.userProfiles = userProfiles;
      this.userProfile = this.userProfiles[0];
    },
      error => {
        this.errorMessage = error;
      });

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
      categories.forEach(category => {
        if (category.experties) {
          category.experties.push({ id: '', name: 'Other', type: 'Other' });
        } else {
          const experty: IExperty = { id: '', name: 'Other', type: 'Other' };
          category.experties = [experty];
        }
        this.categoryDS.push({ label: category.name, value: { name: category.name, experties: category.experties } });
      });
      this.categoryDS.push({ label: 'Other', value: { name: 'Other', experties: [{ name: 'Other', value: 'Other' }] } });
    },
      error => {
        this.errorMessage = <any>error;
      });

    this._userService.getSchools().subscribe(schools => {
      this.schools = schools;
    },
      error => {
        this.errorMessage = <any>error;
      });

  }

  showGeneralDetailFormDialog(): void {
    this.showGeneralDetailForm = true;
  }
  showProfessionalDetailFormDialog(): void {
    this.showProfessionalDetailForm = true;
  }
  showWorkPlaceDetailFormDialog(): void {
    this.showWorkPlaceDetailForm = true;
  }

  userGeneralDetailFormComponentSave(): void {
    this.userGeneralDetailFormComponent.onSubmit();
  }
  userProfessionalDetailFormComponentSave(): void {
    this.userProfessionalDetailFormComponent.onSubmit();
  }
  userWorkPlaceDetailFormComponentSave(): void {
    this.userWorkPlaceDetailFormComponent.onSubmit();
  }

}
