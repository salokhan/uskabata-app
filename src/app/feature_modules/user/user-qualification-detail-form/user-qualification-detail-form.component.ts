import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { ISchool } from '../../../shared_modules/school';
import { GenericFunctionsService } from '../../../shared_modules/generic-functions-service';
import { CustomformVaidatorsService } from '../../../shared_modules/form-validators/custom-form-validators-service';
import { UserService } from '../service-user/user.service';
import { IQualificationDetail } from '../../../shared_modules/userProfile';

@Component({
  selector: 'app-user-qualification-detail-form',
  templateUrl: './user-qualification-detail-form.component.html',
  styleUrls: ['./user-qualification-detail-form.component.scss']
})
export class UserQualificationDetailFormComponent implements OnInit {

  userQualificationDetailForm: FormGroup;
  filteredSchool: any[];
  schools: ISchool[];
  errorMessage: string;

  qualificationDetail: IQualificationDetail;

  constructor(private _userService: UserService, private _formBuilder: FormBuilder,
    private _customeFormValidatorService: CustomformVaidatorsService,
    private _genericFunctionsService: GenericFunctionsService,
    private _messageService: MessageService) {

  }

  ngOnInit() {

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

  initializeFormOnPopUp(qualificationDetail: IQualificationDetail): void {

    this.qualificationDetail = qualificationDetail;

    this._userService.getSchools().subscribe(schools => {
      this.schools = schools;
    },
      error => {
        this.errorMessage = <any>error;
      });

    this.userQualificationDetailForm = this._formBuilder.group({
      school: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      duration: new FormGroup({
        startDate: new FormControl('', Validators.required),
        endDate: new FormControl('', Validators.required)
      })
    });

    if (this.qualificationDetail) {
      this.setQualificationDetailFormData();
    }

  }
  setQualificationDetailFormData(): void {
    if (this.qualificationDetail) {
      this.userQualificationDetailForm.controls['duration'].patchValue({
        'startDate': this.qualificationDetail.startDate,
        'endDate': this.qualificationDetail.endDate
      });
      this.userQualificationDetailForm.patchValue(this.qualificationDetail);
    }
  }

}
