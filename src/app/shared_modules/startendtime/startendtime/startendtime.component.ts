import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { GenericFunctionsService } from '../../generic-functions-service';
import { CustomformVaidatorsService } from '../../form-validators/custom-form-validators-service';
import { IStartEndTime } from '../../startendtime';

@Component({
  selector: 'app-startendtime',
  templateUrl: './startendtime.component.html',
  styleUrls: ['./startendtime.component.scss']
})
export class StartendtimeComponent implements OnInit {
  @Input() timmingForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _genericFunctionsService: GenericFunctionsService,
    private _customeFormValidatorService: CustomformVaidatorsService) { }

  ngOnInit() {
  }

}
