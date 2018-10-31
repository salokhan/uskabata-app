import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { BaseDataSourcesService } from '../../../shared_modules/base-ds-service';
import { MessageService } from 'primeng/api';
import { GenericFunctionsService } from '../../../shared_modules/generic-functions-service';
import { IExperty } from '../../../shared_modules/experty';
import { ICategory } from '../../../shared_modules/category';
import { IProfessionalDetail } from '../../../shared_modules/userProfile';
import { UserService } from '../service-user/user.service';

@Component({
  selector: 'app-user-professional-detail-form',
  templateUrl: './user-professional-detail-form.component.html',
  styleUrls: ['./user-professional-detail-form.component.scss']
})
export class UserProfessionalDetailFormComponent implements OnInit {

  userProfessionalDetailForm: FormGroup;
  errorMessage: string;
  catExpertyValidation = [Validators.required, Validators.minLength(2), Validators.maxLength(20)];

  categories: ICategory[];
  experties: IExperty[];
  @Input() professionalDetail: IProfessionalDetail;
  filteredCategories: ICategory[];
  filteredExperties: IExperty[];

  constructor(private _userService: UserService, private _basedsService: BaseDataSourcesService,
    private _formBuilder: FormBuilder, private _messageService: MessageService,
    public _genericFunctionsService: GenericFunctionsService) { }

  ngOnInit() {

  }
  categorySelected(category: ICategory): void {
    if (category && category.experties.length > 0) {
      this.experties = category.experties;
    }
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    if (this.userProfessionalDetailForm.status === 'INVALID') {
      this.showValidationError();
    }
  }

  showValidationError() {
    this._messageService.add({
      severity: 'error', summary: 'Error Message',
      detail: this._genericFunctionsService.getErrorMessage()
    });
  }

  /* Search Functiontions for autocomplete */
  searchCategory(event) {
    const query = event.query;
    this.filteredCategories = this.filterCategory(query, this.categories);
  }
  filterCategory(query, categories: ICategory[]): ICategory[] {
    // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    const filtered: ICategory[] = [];
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      if (category.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(category);
      }
    }
    return filtered;
  }

  searchExperty(event) {
    const query = event.query;
    this.filteredExperties = this.filterExperty(query, this.experties);
  }
  filterExperty(query, experties: IExperty[]): IExperty[] {
    // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    const filtered: IExperty[] = [];
    for (let i = 0; i < experties.length; i++) {
      const experty = experties[i];
      if (experty.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(experty);
      }
    }
    return filtered;
  }

  setProfessionalDetailFormData(): void {
    if (this.professionalDetail) {
      this.userProfessionalDetailForm.patchValue(this.professionalDetail);
    }
  }

  initializeFormOnPopUp(): void {
    this._userService.getCategories().subscribe(categories => {
      this.categories = categories;
    },
      error => {
        this.errorMessage = <any>error;
      });

    this.userProfessionalDetailForm = this._formBuilder.group({
      description: new FormControl('', Validators.maxLength(200)),
      category: new FormControl(undefined, this.catExpertyValidation),
      experty: new FormControl(undefined, this.catExpertyValidation),
      tags: new FormControl([]),
      activateProfessionProfile: new FormControl(false)
    });

    if (this.professionalDetail) {
      this.setProfessionalDetailFormData();
    }
  }

}
