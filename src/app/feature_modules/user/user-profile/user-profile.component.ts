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
import { UserQualificationDetailFormComponent } from '../user-qualification-detail-form/user-qualification-detail-form.component';
import { IState } from '../../../shared_modules/state';

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

  @ViewChild(UserQualificationDetailFormComponent)
  private userQualificationDetailFormComponent: UserQualificationDetailFormComponent;

  errorMessage: string;

  countries: ICountry[];
  cities: ICity[];
  states: IState[];
  categories: ICategory[];
  categoryDS = [];
  schools: ISchool[];
  userProfile: IUserProfile;

  showGeneralDetailForm = false;
  showProfessionalDetailForm = false;
  showWorkPlaceDetailForm = false;
  showQualificationDetailForm = false;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this._userService.getUserProfile().subscribe(userProfile => {
      this.userProfile = userProfile;
    },
      error => {
        this.errorMessage = error;
      });

    this._userService.getCountries().subscribe(countries => {
      this.countries = countries;
    },
      error => {
        this.errorMessage = error;
      });

    this._userService.getStates().subscribe(states => {
      this.states = states;
    },
      error => {
        this.errorMessage = error;
      });

    this._userService.getCities().subscribe(cities => {
      this.cities = cities;
    },
      error => {
        this.errorMessage = error;
      });

    this._userService.getCategories().subscribe(categories => {
      this.categories = categories;
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
    this.userGeneralDetailFormComponent.initializeFormOnPopUp();
  }
  showProfessionalDetailFormDialog(): void {
    this.showProfessionalDetailForm = true;
    this.userProfessionalDetailFormComponent.initializeFormOnPopUp();
  }
  showWorkPlaceDetailFormDialog(): void {
    this.showWorkPlaceDetailForm = true;
  }
  showQualificationDetailFormDialog(): void {
    this.showQualificationDetailForm = true;
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
  userQualificationDetailFormComponentSave(): void {
    this.userQualificationDetailFormComponent.onSubmit();
  }

}
