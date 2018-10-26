import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { ISchool } from '../../../shared_modules/school';

@Component({
  selector: 'app-user-qualification-detail',
  templateUrl: './user-qualification-detail.component.html',
  styleUrls: ['./user-qualification-detail.component.scss']
})
export class UserQualificationDetailComponent implements OnInit {

  userQualificationDetailForm: FormGroup;
  educations: FormArray;
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

  constructor(private _formBuilder: FormBuilder, private _messageService: MessageService) { }

  ngOnInit() {
    this._schools.subscribe(data => {
    });

    this.userQualificationDetailForm = this._formBuilder.group({
      educations: this._formBuilder.array([this.createEducation()])
    });
  }

  createEducation(): FormGroup {
    return this._formBuilder.group({
      school: new FormControl('', [Validators.required,Validators.minLength(2), Validators.maxLength(20)]),
      degree: new FormControl('', Validators.required),
      fielOfStudy: new FormControl('', Validators.required),
      fromYear: new FormControl('', Validators.required),
      toYear: new FormControl('', Validators.required),
      description: new FormControl('', Validators.maxLength(200))
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

}
