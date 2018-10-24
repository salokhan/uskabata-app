import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service-user/user.service';
import { ICountry } from '../../../shared_modules/country';
import { ICity } from '../../../shared_modules/city';
import { BaseDataSourcesService } from '../../../shared_modules/base-ds-service';
import { MessageService } from 'primeng/api';
import { GenericFunctionsService } from '../../../shared_modules/generic-functions-service';

@Component({
  selector: 'app-user-work-profile',
  templateUrl: './user-work-profile.component.html',
  styleUrls: ['./user-work-profile.component.scss']
})
export class UserWorkProfileComponent implements OnInit {

  userWorkProfileForm: FormGroup;
  contacts: FormArray;
  landLineContacts: FormArray;

  errorMessage: string;

  countries: ICountry[];
  countriesDS = [];
  cities: ICity[];
  citiesDS = [];
  titles = [];
  genders = [];

  constructor(private _userService: UserService, private _basedsService: BaseDataSourcesService,
    private _formBuilder: FormBuilder, private _messageService: MessageService,
    public _genericFunctionsService: GenericFunctionsService) { }

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

    this.userWorkProfileForm = this._formBuilder.group({
      description: new FormControl('', Validators.maxLength(200)),
      workAddress: new FormGroup({
        addressLine: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        country: new FormControl(undefined, Validators.required),
        city: new FormControl(undefined, Validators.required),
        state: new FormControl(undefined)
      }),
      contacts: this._formBuilder.array([this.createContact()])
    });
  }

  createContact(): FormGroup {
    // if the first control is creating
    if (!this.userWorkProfileForm) {
      return this._formBuilder.group({
        contactNumber: ['', [Validators.required, Validators.pattern(/^\+[1-9]{1}[0-9]{3,14}$/)]],
      });
    } else {
      return this._formBuilder.group({
        contactNumber: ['', [Validators.pattern(/^\+[1-9]{1}[0-9]{3,14}$/)]],
      });
    }
  }

  addContact(): void {
    this.contacts = this.userWorkProfileForm.get('contacts') as FormArray;
    this.contacts.push(this.createContact());
  }

  removeContact(index: number): void {
    if (index !== 0) {
      this.contacts = this.userWorkProfileForm.get('contacts') as FormArray;
      this.contacts.removeAt(index);
    }
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    if (this.userWorkProfileForm.status === 'INVALID') {
      this.showValidationError();
    } else {
      this.clearMessages();
    }
  }

  showValidationError() {
    this.clearMessages();
    this._genericFunctionsService.scrollToTop();
    this._messageService.add({
      severity: 'error', summary: 'Error Message',
      detail: this._genericFunctionsService.getErrorMessage()
    });
  }
  clearMessages() {
    this._messageService.clear();
  }
}
