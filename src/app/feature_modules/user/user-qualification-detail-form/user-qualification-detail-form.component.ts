import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { ISchool } from '../../../shared_modules/school';
import { GenericFunctionsService } from '../../../shared_modules/generic-functions-service';
import { CustomformVaidatorsService } from '../../../shared_modules/form-validators/custom-form-validators-service';

@Component({
  selector: 'app-user-qualification-detail-form',
  templateUrl: './user-qualification-detail-form.component.html',
  styleUrls: ['./user-qualification-detail-form.component.scss']
})
export class UserQualificationDetailFormComponent implements OnInit {

  userQualificationDetailForm: FormGroup;
  filteredSchool: any[];

  // initialize a private variable schools, it's a BehaviorSubject
  private _schools = new BehaviorSubject<ISchool[]>([]);
  // change data to use getter and setter
  @Input()
  set schools(value) {
    // set the latest value for _schools BehaviorSubject
    this._schools.next(value);
  }
  get schools() {
    // get the latest value from _schools BehaviorSubject
    return this._schools.getValue();
  }

  constructor(private _formBuilder: FormBuilder, private _customeFormValidatorService: CustomformVaidatorsService,
    private _genericFunctionsService: GenericFunctionsService,
    private _messageService: MessageService) {

  }

  ngOnInit() {
    this._schools.subscribe(data => {
    });

    this.userQualificationDetailForm = this._formBuilder.group({
      school: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      duration: new FormGroup({
        startDate: new FormControl('', Validators.required),
        endDate: new FormControl('', Validators.required)
      })

    });
  }

  searchSchool(event) {
    const query = event.query;
    this.filteredSchool = this.filterSchool(query, this.schools);
  }
  filterSchool(query, schools: ISchool[]): ISchool[] {
    // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    const filtered: any[] = [];
    for (let i = 0; i < schools.length; i++) {
      const school = schools[i];
      if (school.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(school.name);
      }
    }
    return filtered;
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    if (this.userQualificationDetailForm.status === 'INVALID') {
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
