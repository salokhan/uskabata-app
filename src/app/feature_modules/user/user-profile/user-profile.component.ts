import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userProfileForm: FormGroup;
  mobileContacts: FormArray;
  landLineContacts: FormArray;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {

    this.userProfileForm = this._formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormGroup({
        addressLine: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        city: new FormControl(''),
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
    console.warn(this.userProfileForm.value);
  }

}
