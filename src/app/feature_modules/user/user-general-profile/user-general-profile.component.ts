import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service-user/user.service';
import { ICountry } from '../../../shared_modules/country';
import { ICity } from '../../../shared_modules/city';
import { BaseDataSourcesService } from '../../../shared_modules/base-ds-service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-general-profile',
  templateUrl: './user-general-profile.component.html',
  styleUrls: ['./user-general-profile.component.scss']
})
export class UserGeneralProfileComponent implements OnInit {

  userProfileForm: FormGroup;
  mobileContacts: FormArray;
  landLineContacts: FormArray;

  errorMessage: string;

  countries: ICountry[];
  countriesDS = [];
  cities: ICity[];
  citiesDS = [];
  titles = [];
  genders = [];

  constructor(private _userService: UserService, private _basedsService: BaseDataSourcesService,
    private _formBuilder: FormBuilder, private _messageService: MessageService) { }

  ngOnInit() {

    this.titles = this._basedsService.getTitles();
    this.genders = this._basedsService.getGender();

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

    this.userProfileForm = this._formBuilder.group({
      title: new FormControl('', Validators.required),
      displayName: new FormControl(''),
      firstName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('', Validators.required),
      about: new FormControl('', Validators.maxLength(200)),
      address: new FormGroup({
        addressLine: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        country: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        state: new FormControl('')
      }),
      mobileContacts: this._formBuilder.array([this.createMobileContact()]),
      landLineContacts: this._formBuilder.array([this.createLandLineContact()])
    });
  }

  createMobileContact(): FormGroup {
    // if the first control is creating
    if (!this.userProfileForm) {
      return this._formBuilder.group({
        mobileNumber: ['', [Validators.required, Validators.pattern(/^\+[1-9]{1}[0-9]{3,14}$/)]],
      });
    } else {
      return this._formBuilder.group({
        mobileNumber: ['', [Validators.pattern(/^\+[1-9]{1}[0-9]{3,14}$/)]],
      });
    }
  }

  addMobileContact(): void {
    this.mobileContacts = this.userProfileForm.get('mobileContacts') as FormArray;
    this.mobileContacts.push(this.createMobileContact());
  }

  removeMobileContact(index: number): void {
    if (index !== 0) {
      this.mobileContacts = this.userProfileForm.get('mobileContacts') as FormArray;
      this.mobileContacts.removeAt(index);
    }
  }

  createLandLineContact(): FormGroup {
    return this._formBuilder.group({
      landLineNumber: ['', [Validators.pattern(/^\+[1-9]{1}[0-9]{3,14}$/)]],
    });
  }

  addLandLineContact(): void {
    this.landLineContacts = this.userProfileForm.get('landLineContacts') as FormArray;
    this.landLineContacts.push(this.createLandLineContact());
  }

  removeLandLineContact(index: number): void {
    if (index !== 0) {
      this.landLineContacts = this.userProfileForm.get('landLineContacts') as FormArray;
      this.landLineContacts.removeAt(index);
    }
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    if (this.userProfileForm.status === 'INVALID') {
      this.showValidationError();
    } else {
      this.clearMessages();
    }
  }

  showValidationError() {
    this.clearMessages();
    window.scrollTo(0, 0);
    this._messageService.add({
      severity: 'error', summary: 'Error Message',
      detail: 'Please fill the red marked field and provide the correct format'
    });
  }
  clearMessages() {
    this._messageService.clear();
  }
}
