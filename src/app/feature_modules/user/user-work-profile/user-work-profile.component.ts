import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { BaseDataSourcesService } from '../../../shared_modules/base-ds-service';
import { MessageService } from 'primeng/api';
import { GenericFunctionsService } from '../../../shared_modules/generic-functions-service';
import { BehaviorSubject } from 'rxjs';

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

  titles = [];
  genders = [];

  // initialize a private variable cities, it's a BehaviorSubject
  private _cities = new BehaviorSubject<[]>([]);
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
  private _countries = new BehaviorSubject<[]>([]);
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

    this.userWorkProfileForm = this._formBuilder.group({
      description: new FormControl('', Validators.maxLength(200)),
      activateProfessionProfile: new FormControl(false),
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
    }
  }

  showValidationError() {
    this._messageService.add({
      severity: 'error', summary: 'Error Message',
      detail: this._genericFunctionsService.getErrorMessage()
    });
  }

}
