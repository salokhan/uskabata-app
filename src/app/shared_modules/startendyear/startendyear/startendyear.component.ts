import { Component, OnInit, Output, EventEmitter, OnChanges, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomformVaidatorsService } from '../../form-validators/custom-form-validators-service';
import { GenericFunctionsService } from '../../generic-functions-service';

@Component({
  selector: 'app-startendyear',
  templateUrl: './startendyear.component.html',
  styleUrls: ['./startendyear.component.scss']
})
export class StartendyearComponent implements OnInit {
  @Input() durationForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _genericFunctionsService: GenericFunctionsService,
    private _customeFormValidatorService: CustomformVaidatorsService) { }

  ngOnInit() {
  }

}
