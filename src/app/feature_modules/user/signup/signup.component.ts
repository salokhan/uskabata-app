import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IGeneralDetail } from '../../../shared_modules/userProfile';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../service-user/user.service';
import { BaseDataSourcesService } from '../../../shared_modules/base-ds-service';
import { MessageService } from 'primeng/api';
import { GenericFunctionsService } from '../../../shared_modules/generic-functions-service';
import { CustomformVaidatorsService } from '../../../shared_modules/form-validators/custom-form-validators-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage: string;

  constructor(private _userService: UserService,
    private _customformVaidatorsService: CustomformVaidatorsService,
    private _formBuilder: FormBuilder, private _messageService: MessageService,
    public _genericFunctionsService: GenericFunctionsService) { }

  ngOnInit() {

    this.signupForm = this._formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      userName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      passwords: new FormGroup({
        password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      }, this._customformVaidatorsService.validatePassword)
    });
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    if (this.signupForm.status === 'INVALID') {
      this.showValidationError();
    }
  }
  showValidationError() {
    const messages: any[] = this._customformVaidatorsService.createMessagesArray(this.signupForm);
    this._messageService.addAll(messages);
  }


}
