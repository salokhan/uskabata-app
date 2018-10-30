import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { BaseDataSourcesService } from '../../../shared_modules/base-ds-service';
import { MessageService } from 'primeng/api';
import { GenericFunctionsService } from '../../../shared_modules/generic-functions-service';
import { IGeneralDetail, IUserProfile } from '../../../shared_modules/userProfile';
import { ICountry } from '../../../shared_modules/country';
import { ICity } from '../../../shared_modules/city';
import { IState } from '../../../shared_modules/state';

@Component({
  selector: 'app-user-general-detail-form',
  templateUrl: './user-general-detail-form.component.html',
  styleUrls: ['./user-general-detail-form.component.scss']
})
export class UserGeneralDetailFormComponent implements OnInit {

  @Output() saveClicked: EventEmitter<string> = new EventEmitter<string>();

  userGeneralDetailForm: FormGroup;
  contacts: FormArray;
  landLineContacts: FormArray;

  errorMessage: string;
  titles = [];
  genders = [];

  filteredCities: ICity[];
  filteredCountries: ICountry[];
  filteredStates: IState[];

  // initialize a private variable cities, it's a BehaviorSubject
  private _countries = new BehaviorSubject<ICountry[]>([]);

  // initialize a private variable cities, it's a BehaviorSubject
  private _cities = new BehaviorSubject<ICity[]>([]);

  // initialize a private variable states, it's a BehaviorSubject
  private _states = new BehaviorSubject<IState[]>([]);

  // change data to use getter and setter
  @Input()
  set countries(value) {
    // set the latest value for _cities BehaviorSubject
    this._countries.next(value);
  }
  get countries() {
    // get the latest value from _cities BehaviorSubject
    return this._countries.getValue();
  }

  // change data to use getter and setter
  @Input()
  set states(value) {
    // set the latest value for _state BehaviorSubject
    this._states.next(value);
  }
  get states() {
    // get the latest value from _states BehaviorSubject
    return this._states.getValue();
  }

  // change data to use getter and setter
  @Input()
  set cities(value) {
    // set the latest value for _cities BehaviorSubject
    this._cities.next(value);
  }
  get cities() {
    // get the latest value from _cities BehaviorSubject
    return this._cities.getValue();
  }

  // initialize a private variable userProfile, it's a BehaviorSubject
  private _userProfile = new BehaviorSubject<IUserProfile[]>([]);
  // change data to use getter and setter
  @Input()
  set userProfile(value) {
    // set the latest value for _userProfile BehaviorSubject
    this._userProfile.next(value);
  }
  get userProfile() {
    // get the latest value from _userProfile BehaviorSubject
    return this._userProfile.getValue();
  }



  constructor(private _basedsService: BaseDataSourcesService,
    private _formBuilder: FormBuilder, private _messageService: MessageService,
    public _genericFunctionsService: GenericFunctionsService) { }

  ngOnInit() {

    this.titles = this._basedsService.getTitles();

    this._userProfile.subscribe(data => {
      if (this.userProfile && this.userProfile['generalDetail']) {
        this.setGeneralDetailFormData(this.userProfile['generalDetail']);
      }
    });

    this.genders = this._basedsService.getGender();

    this._cities.subscribe(data => {
    });

    this._countries.subscribe(data => {
    });

    this._states.subscribe(data => {
    });

    this.userGeneralDetailForm = this._formBuilder.group({
      title: new FormControl('', Validators.required),
      displayName: new FormControl(''),
      firstName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      email: new FormControl('', [Validators.email]),
      gender: new FormControl('', Validators.required),
      about: new FormControl('', Validators.maxLength(200)),
      addressPersonal: new FormGroup({
        addressLine: new FormControl('', [Validators.maxLength(100)]),
        country: new FormControl(undefined),
        city: new FormControl(undefined),
        state: new FormControl(undefined)
      }),
      contactsPersonal: this._formBuilder.array([this.createContact()])
    });
  }

  createContact(): FormGroup {
    return this._formBuilder.group({
      contactNumber: ['', [Validators.pattern(/^\+[1-9]{1}[0-9]{3,14}$/)]],
    });
  }

  addContact(): void {
    this.contacts = this.userGeneralDetailForm.get('contactsPersonal') as FormArray;
    this.contacts.push(this.createContact());
  }

  removeContact(index: number): void {
    if (index !== 0) {
      this.contacts = this.userGeneralDetailForm.get('contactsPersonal') as FormArray;
      this.contacts.removeAt(index);
    }
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    if (this.userGeneralDetailForm.status === 'INVALID') {
      this.showValidationError();
    }
  }

  showValidationError() {
    this._messageService.add({
      severity: 'error', summary: 'Error Message',
      detail: this._genericFunctionsService.getErrorMessage()
    });
  }

  setGeneralDetailFormData(generalDetail: IGeneralDetail): void {
    if (generalDetail) {
      generalDetail.contactsPersonal.forEach(contact => {
        this.addContact();
      });
    }
    this.userGeneralDetailForm.patchValue(generalDetail);
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

}
