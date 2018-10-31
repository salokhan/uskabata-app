import { FormControl, Validators, FormGroup } from '@angular/forms';
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
            return {invalid: true};
        }
        return null;
    }
}
