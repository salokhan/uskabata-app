import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { BaseDataSourcesService } from '../../../shared_modules/base-ds-service';
import { MessageService } from 'primeng/api';
import { GenericFunctionsService } from '../../../shared_modules/generic-functions-service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-work-place-detail-form',
  templateUrl: './user-work-place-detail-form.component.html',
  styleUrls: ['./user-work-place-detail-form.component.scss']
})
export class UserWorkPlaceDetailFormComponent implements OnInit {

  userWorkPlaceDetailForm: FormGroup;
  contactsWork: FormArray;
  errorMessage: string;

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

  // initialize a private variable countries, it's a BehaviorSubject
  private _countries = new BehaviorSubject<any[]>([]);
  // change data to use getter and setter
  @Input()
  set countries(value) {
    // set the latest value for _countries BehaviorSubject
    this._countries.next(value);
  }
  get countries() {
    // get the latest value from _countries BehaviorSubject
    return this._countries.getValue();
  }

  constructor(private _basedsService: BaseDataSourcesService,
    private _formBuilder: FormBuilder, private _messageService: MessageService,
    public _genericFunctionsService: GenericFunctionsService) { }

  ngOnInit() {
    this._cities.subscribe(data => {
    });

    this._countries.subscribe(data => {
    });

    this.userWorkPlaceDetailForm = this._formBuilder.group({
      title: new FormControl('', Validators.maxLength(50)),
      workaddresses: new FormGroup({
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

}
