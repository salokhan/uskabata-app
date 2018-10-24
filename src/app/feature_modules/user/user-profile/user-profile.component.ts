import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service-user/user.service';
import { ICountry } from '../../../shared_modules/country';
import { ICity } from '../../../shared_modules/city';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userProfileForm: FormGroup;
  mobileContacts: FormArray;
  landLineContacts: FormArray;

  errorMessage: string;

  countries: ICountry[];
  countriesDS = [];
  cities: ICity[];
  citiesDS = [];

  constructor(private _userService: UserService, private _formBuilder: FormBuilder) { }

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

    this.userProfileForm = this._formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormGroup({
        addressLine: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        country: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required)
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
    console.warn(this.userProfileForm.value);
  }

}
