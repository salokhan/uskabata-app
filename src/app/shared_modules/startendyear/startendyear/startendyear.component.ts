import { Component, OnInit, Output, EventEmitter, OnChanges, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomformVaidatorsService } from '../../form-validators/custom-form-validators-service';
import { GenericFunctionsService } from '../../generic-functions-service';
import { IStartEndYear } from '../../startendyear';

@Component({
  selector: 'app-startendyear',
  templateUrl: './startendyear.component.html',
  styleUrls: ['./startendyear.component.scss']
})
export class StartendyearComponent implements OnInit {
  @Input() startendyearForm: FormGroup;
  startYears: any[] = [];
  endYears: any[] = [];
  startMonths: any[] = [];
  endMonths: any[] = [];
  startEndYear: IStartEndYear;

  constructor(private _formBuilder: FormBuilder, private _genericFunctionsService: GenericFunctionsService,
    private _customeFormValidatorService: CustomformVaidatorsService) { }

  ngOnInit() {
    this.createStartYearList();
    this.createStartMonthList();
  }
  startYearSelect(selectedIndex: number): void {
    if (this.startendyearForm.controls.endAt['controls'].year) {
      this.startendyearForm.controls.endAt['controls'].year.setValue('Select end year');
    }
    if (this.startendyearForm.controls.startFrom['controls'].year.value === this.startendyearForm.controls.endAt['controls'].year.value) {
      // if years are same remove the end month value
      this.startendyearForm.controls.endAt['controls'].month.setValue('Select end month');
    }
    this.endYears = [];
    this.endYears.push('Select end year');
    for (let i = 1; i !== selectedIndex + 1; i++) {
      this.endYears.push(this.startYears[i]);
    }
  }

  startMonthSelect(selectedIndex: number, indexOfEducationControl: number): void {
    this.endMonths = [];
    this.endMonths.push('Select end month');
    if (this.startendyearForm.controls.startFrom['controls'].year && this.startendyearForm.controls.endAt['controls'].year) {
      // if both the years are same then months should be removed from current index onward
      if (this.startendyearForm.controls.startFrom['controls'].year.value === this.startendyearForm.controls.endAt['controls'].year.value) {
        for (let i = selectedIndex + 1; i !== this.startMonths.length; i++) {
          this.endMonths.push(this.startMonths[i]);
        }
        if (this.startendyearForm.controls.endAt['controls'].month) {
          this.startendyearForm.controls.endAt['controls'].month.setValue('Select end month');
        }
      } else {
        // fill the end month array with all the months
        for (let i = 1; i !== this.startMonths.length; i++) {
          this.endMonths.push(this.startMonths[i]);
        }
      }
    }
  }
  endYearSelect(selectedIndex: number): void {
    if (this.startendyearForm.controls.startFrom['controls'].year && this.startendyearForm.controls.endAt['controls'].year) {
      if (this.startendyearForm.controls.startFrom['controls'].year.value === this.startendyearForm.controls.endAt['controls'].year.value) {
        const selectedIndexOfStartMonth = this.startMonths.indexOf(this.startendyearForm.controls.startFrom['controls'].month.value);
        this.endMonths = [];
        this.endMonths.push('Select end month');
        this.startendyearForm.controls.endAt['controls'].month.setValue('Select end month');
        for (let i = selectedIndexOfStartMonth + 1; i !== this.startMonths.length; i++) {
          this.endMonths.push(this.startMonths[i]);
        }
      } else {
        this.endMonths = [];
        this.endMonths.push('Select end month');
        for (let i = 1 + 1; i !== this.startMonths.length; i++) {
          this.endMonths.push(this.startMonths[i]);
        }
      }
    }
  }

  createStartYearList(): void {
    this.startYears = this._genericFunctionsService.getYears();
    this.endYears = this._genericFunctionsService.getYears();
    this.startYears.unshift('Select start year');
    this.endYears.unshift('Select end year');
  }

  createStartMonthList(): void {
    this.startMonths = this._genericFunctionsService.getMonths();
    this.endMonths = this._genericFunctionsService.getMonths();
    this.startMonths.unshift('Select start month');
    this.endMonths.unshift('Select end month');
  }

}
