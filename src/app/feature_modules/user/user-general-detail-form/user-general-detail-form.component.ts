import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { BaseDataSourcesService } from '../../../shared_modules/base-ds-service';
import { MessageService } from 'primeng/api';
import { GenericFunctionsService } from '../../../shared_modules/generic-functions-service';

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

  // initialize a private variable cities, it's a BehaviorSubject
  private _cities = new BehaviorSubject<any[]>([]);
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

  // initialize a private variable cities, it's a BehaviorSubject
  private _countries = new BehaviorSubject<any[]>([]);
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

  constructor(private _basedsService: BaseDataSourcesService,
    private _formBuilder: FormBuilder, private _messageService: MessageService,
    public _genericFunctionsService: GenericFunctionsService) { }

  ngOnInit() {

    this.titles = this._basedsService.getTitles();
    this.genders = this._basedsService.getGender();

    this._cities.subscribe(data => {
    });

    this._countries.subscribe(data => {
    });

    this.userGeneralDetailForm = this._formBuilder.group({
      title: new FormControl('', Validators.required),
      displayName: new FormControl(''),
      firstName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('', Validators.required),
      about: new FormControl('', Validators.maxLength(200)),
      address: new FormGroup({
        addressLine: new FormControl('', [Validators.maxLength(100)]),
        country: new FormControl(undefined),
        city: new FormControl(undefined),
        state: new FormControl(undefined)
      }),
      contacts: this._formBuilder.array([this.createContact()])
    });
  }

  createContact(): FormGroup {
    return this._formBuilder.group({
      contactNumber: ['', [Validators.pattern(/^\+[1-9]{1}[0-9]{3,14}$/)]],
    });
  }

  addContact(): void {
    this.contacts = this.userGeneralDetailForm.get('contacts') as FormArray;
    this.contacts.push(this.createContact());
  }

  removeContact(index: number): void {
    if (index !== 0) {
      this.contacts = this.userGeneralDetailForm.get('contacts') as FormArray;
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

}
