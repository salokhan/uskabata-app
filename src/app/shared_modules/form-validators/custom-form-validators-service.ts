import { FormControl, Validators, FormGroup, Form, AbstractControl, FormArray } from '@angular/forms';
import { GenericFunctionsService } from '../generic-functions-service';
import { Injectable } from '@angular/core';

let months: any[] = [];

@Injectable()
export class CustomformVaidatorsService extends Validators {

    constructor(private _genericFunctionsService: GenericFunctionsService) {
        super();
        months = this._genericFunctionsService.getMonths();
    }

    validateMonth(control: FormControl) {
        if (control.value && control.value.length) {
            const indexOfmonth = months.indexOf(control.value);
            if (indexOfmonth > -1) {
                const month = months[indexOfmonth];
                return null;
            }
            return { 'month': false };
        }
    }

    validatePassword(password: FormGroup) {
        if (password['controls']['password'].value !== password['controls']['confirmPassword'].value) {
            return { passwordmismatch: true };
        }
        return null;
    }

    validateForm(formToInvestigate: FormGroup | FormArray): any[] {
        const invalidControls: any[] = [];
        const recursiveFunc = (form: FormGroup | FormArray) => {
            Object.keys(form.controls).forEach(field => {
                const control = form.get(field);
                if (control.invalid) { invalidControls.push({ 'field': field, 'error': control.errors ? control.errors : '' }); }
                if (control instanceof FormGroup) {
                    recursiveFunc(control);
                } else if (control instanceof FormArray) {
                    recursiveFunc(control);
                }
            });
        };
        recursiveFunc(formToInvestigate);
        return invalidControls;
    }

    createMessageObject(severity: string, summary: string, detail: string): IToastMessage {
        const toastMessage: IToastMessage = new IToastMessage();
        toastMessage.severity = severity;
        toastMessage.summary = summary;
        toastMessage.detail = detail;
        return toastMessage;
    }
    createMessagesArray(formToInvestigate: FormGroup | FormArray): any[] {

        const errors: any[] = this.validateForm(formToInvestigate);
        const messages = [];
        errors.forEach(error => {
            const errorValues: IErrorValues = { field: '', key: '', maxLength: '', minLength: '' };
            if (error && error['error'] && error['error'].required) {
                errorValues.field = error.field;
                errorValues.key = errorEnum.required;
                messages.push(this.getErrorMessageByKey(errorValues));

            } if (error && error['error'] && error['error'].minlength) {
                errorValues.field = error.field;
                errorValues.key = errorEnum.minlength;
                errorValues.minLength = error['error'].minlength.requiredLength;
                messages.push(this.getErrorMessageByKey(errorValues));

            } if (error && error['error'] && error['error'].maxlength) {
                errorValues.field = error.field;
                errorValues.key = errorEnum.maxlength;
                errorValues.maxLength = error['error'].maxlength.requiredLength;
                messages.push(this.getErrorMessageByKey(errorValues));
            } if (error && error['error'] && error['error'].passwordmismatch) {
                errorValues.field = error.field;
                errorValues.key = errorEnum.passwordmismatch;
                messages.push(this.getErrorMessageByKey(errorValues));
            } if (error && error['error'] && error['error'].email) {
                errorValues.field = error.field;
                errorValues.key = errorEnum.email;
                messages.push(this.getErrorMessageByKey(errorValues));
            }
        });
        return messages;

    }

    getErrorMessageByKey(errorValues: IErrorValues): IToastMessage {
        switch (errorValues.key) {
            case errorEnum.required:
                {
                    return this.createMessageObject(errorSeverity.error, errorSummary.error,
                        this.getMessageDetail(errorValues));
                }
            case errorEnum.passwordmismatch:
                {
                    return this.createMessageObject(errorSeverity.error, errorSummary.error,
                        this.getMessageDetail(errorValues));
                }
            case errorEnum.minlength:
                {
                    return this.createMessageObject(errorSeverity.error, errorSummary.error,
                        this.getMessageDetail(errorValues));
                }
            case errorEnum.maxlength:
                {
                    return this.createMessageObject(errorSeverity.error, errorSummary.error,
                        this.getMessageDetail(errorValues));
                }
            case errorEnum.email:
                {
                    return this.createMessageObject(errorSeverity.error, errorSummary.error,
                        this.getMessageDetail(errorValues));
                }
        }
    }
    getMessageDetail(erroeValues: IErrorValues): string {
        switch (erroeValues.key) {
            case errorEnum.required:
                {
                    return erroeValues.field + ' is required ';
                }
            case errorEnum.passwordmismatch:
                {
                    return 'Password does not match';
                }
            case errorEnum.minlength:
                {
                    return erroeValues.field + ' min length should be ' + erroeValues.minLength;
                }
            case errorEnum.maxlength:
                {
                    return erroeValues.field + ' max length should be ' + erroeValues.maxLength;
                }
            case errorEnum.email:
                {
                    return 'Email address is invalid';
                }
        }
    }
}
export interface IErrorValues {
    key: string;
    field: string;
    minLength?: string;
    maxLength?: string;
}
export enum errorEnum {
    passwordmismatch = 'Passwordmismatch',
    required = 'Required',
    minlength = 'Minlength',
    maxlength = 'Maxlength',
    email = 'email'
}

export enum errorSeverity {
    success = 'success',
    info = 'info',
    warn = 'warn',
    error = 'error'
}

export enum errorSummary {
    success = 'Success Message',
    info = 'Info Message',
    warn = 'Warning Message',
    error = 'Error Message'
}
export class IToastMessage {
    severity: string;
    summary: string;
    detail: string;
}
