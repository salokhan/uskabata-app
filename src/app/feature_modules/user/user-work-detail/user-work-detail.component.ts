import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { BaseDataSourcesService } from '../../../shared_modules/base-ds-service';
import { MessageService } from 'primeng/api';
import { GenericFunctionsService } from '../../../shared_modules/generic-functions-service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-work-detail',
  templateUrl: './user-work-detail.component.html',
  styleUrls: ['./user-work-detail.component.scss']
})
export class UserWorkDetailComponent implements OnInit {

  userWorkDetailForm: FormGroup;
  contacts: FormArray;
  landLineContacts: FormArray;
  errorMessage: string;
  catExpertyValidation = [Validators.required, Validators.minLength(2), Validators.maxLength(20)];
  titles = [];
  genders = [];
  experties = [];

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

  // initialize a private variable categories, it's a BehaviorSubject
  private _categories = new BehaviorSubject<any[]>([]);
  // change data to use getter and setter
  @Input()
  set categories(value) {
    // set the latest value for _categories BehaviorSubject
    this._categories.next(value);
  }
  get categories() {
    // get the latest value from _categories BehaviorSubject
    return this._categories.getValue();
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

    this._categories.subscribe(data => {
    });

    this.userWorkDetailForm = this._formBuilder.group({
      description: new FormControl('', Validators.maxLength(200)),
      category: new FormControl(undefined, this.catExpertyValidation),
      experty: new FormControl(undefined, this.catExpertyValidation),
      tags: new FormControl([]),
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
    if (!this.userWorkDetailForm) {
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
    this.contacts = this.userWorkDetailForm.get('contacts') as FormArray;
    this.contacts.push(this.createContact());
  }

  removeContact(index: number): void {
    if (index !== 0) {
      this.contacts = this.userWorkDetailForm.get('contacts') as FormArray;
      this.contacts.removeAt(index);
    }
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    if (this.userWorkDetailForm.status === 'INVALID') {
      this.showValidationError();
    }
  }

  showValidationError() {
    this._messageService.add({
      severity: 'error', summary: 'Error Message',
      detail: this._genericFunctionsService.getErrorMessage()
    });
  }
  onCategorySelection(): void {
    // clear experties array
    this.experties = [];
    this.userWorkDetailForm.controls.experty.setValue(undefined);

    const selectedCategoryName = this.userWorkDetailForm.value.category;
    // on selection
    if (selectedCategoryName) {
      const categorySelected = this.categories.find(category => category.value.name === selectedCategoryName.name);
      // if category selected has experties
      if (categorySelected && categorySelected.value.experties) {
        categorySelected.value.experties.forEach(experty => {
          this.experties.push({ label: experty.name, value: experty.name });
        });
        if (this.userWorkDetailForm.controls.category.value.name === 'Other') {
          this.userWorkDetailForm.addControl('categoryOther', new FormControl('', this.catExpertyValidation));
        } else {
          this.userWorkDetailForm.removeControl('categoryOther');
        }

      }
    }
  }

  onExpertySelection(): void {
    if (this.userWorkDetailForm.controls.experty && this.userWorkDetailForm.controls.experty.value === 'Other') {
      this.userWorkDetailForm.addControl('expertyOther', new FormControl('', this.catExpertyValidation));
    } else {
      this.userWorkDetailForm.removeControl('expertyOther');
    }

  }

}
