import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { BaseDataSourcesService } from '../../../../shared_modules/base-ds-service';
import { MessageService } from 'primeng/api';
import { GenericFunctionsService } from '../../../../shared_modules/generic-functions-service';
import { ICity } from '../../../../shared_modules/city';
import { ICountry } from '../../../../shared_modules/country';
import { IState } from '../../../../shared_modules/state';
import { UserService } from '../../service-user/user.service';
import { IWorkPlaceDetail } from '../../../../shared_modules/userProfile';

@Component({
  selector: 'app-user-work-place-detail-form',
  templateUrl: './user-work-place-detail-form.component.html',
  styleUrls: ['./user-work-place-detail-form.component.scss']
})
export class UserWorkPlaceDetailFormComponent implements OnInit {

  userWorkPlaceDetailForm: FormGroup;
  contactsWork: FormArray;
  errorMessage: string;

  workPlaceDetail: IWorkPlaceDetail;
  countries: ICountry[];
  cities: ICity[];
  states: IState[];

  filteredCities: ICity[];
  filteredCountries: ICountry[];
  filteredStates: IState[];

  constructor(private _userService: UserService, private _basedsService: BaseDataSourcesService,
    private _formBuilder: FormBuilder, private _messageService: MessageService,
    public _genericFunctionsService: GenericFunctionsService) { }

  ngOnInit() {

  }
  createContact(): FormGroup {
    // if the first control is creating
    if (!this.userWorkPlaceDetailForm) {
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
    this.contactsWork = this.userWorkPlaceDetailForm.get('contactsWork') as FormArray;
    this.contactsWork.push(this.createContact());
  }

  removeContact(index: number): void {
    if (index !== 0) {
      this.contactsWork = this.userWorkPlaceDetailForm.get('contactsWork') as FormArray;
      this.contactsWork.removeAt(index);
    }
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    if (this.userWorkPlaceDetailForm.status === 'INVALID') {
      this.showValidationError();
    }
  }

  showValidationError() {
    this._messageService.add({
      severity: 'error', summary: 'Error Message',
      detail: this._genericFunctionsService.getErrorMessage()
    });
  }

  /* Search Functiontions for autocomplete */
  searchCountry(event) {
    const query = event.query;
    this.filteredCountries = this.filterCountry(query, this.countries);
  }
  filterCountry(query, countries: ICountry[]): ICountry[] {
    // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    const filtered: ICountry[] = [];
    for (let i = 0; i < countries.length; i++) {
      const country = countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(country);
      }
    }
    return filtered;
  }
  searchState(event) {
    const query = event.query;
    this.filteredStates = this.filterState(query, this.states);
  }
  filterState(query, states: IState[]): IState[] {
    // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    const filtered: IState[] = [];
    for (let i = 0; i < states.length; i++) {
      const state = states[i];
      if (state.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(state);
      }
    }
    return filtered;
  }

  searchCity(event) {
    const query = event.query;
    this.filteredCities = this.filterCity(query, this.cities);
  }
  filterCity(query, cities: ICity[]): ICity[] {
    // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    const filtered: ICity[] = [];
    for (let i = 0; i < cities.length; i++) {
      const city = cities[i];
      if (city.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(city);
      }
    }
    return filtered;
  }

  initializeFormOnPopUp(workPlaceDetail: IWorkPlaceDetail): void {
    this.workPlaceDetail = workPlaceDetail;

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

    this.userWorkPlaceDetailForm = this._formBuilder.group({
      title: new FormControl('', Validators.maxLength(50)),
      addressWorkPlace: new FormGroup({
        addressLine: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        country: new FormControl(undefined, Validators.required),
        city: new FormControl(undefined, Validators.required),
        state: new FormControl(undefined),
      }),
      timming: new FormGroup({
        startTime: new FormControl('', Validators.required),
        endTime: new FormControl('', Validators.required)
      }),
      contactsWork: this._formBuilder.array([this.createContact()])
    });

    if (this.workPlaceDetail) {
      this.setWorkPlaceDetailFormData();
    }
  }

  setWorkPlaceDetailFormData(): void {
    if (this.workPlaceDetail) {
      this.workPlaceDetail.contactsWork.forEach(contact => {
        this.addContact();
      });
      this.userWorkPlaceDetailForm.controls['timming'].patchValue({
        'startTime': this.workPlaceDetail.startTime,
        'endTime': this.workPlaceDetail.endTime
      });
      this.userWorkPlaceDetailForm.patchValue(this.workPlaceDetail);
    }
  }

}
