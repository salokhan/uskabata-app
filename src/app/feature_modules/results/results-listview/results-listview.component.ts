import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IResult } from '../result';
import { Router } from '@angular/router';
import { ResultService } from '../service-result/result.service';

@Component({
  selector: 'app-results-listview',
  templateUrl: './results-listview.component.html',
  styleUrls: ['./results-listview.component.scss'],
})
export class ResultsListViewComponent implements OnInit, OnDestroy {

  @Input() results: IResult[];
  resultSelected: IResult;
  imageHeight = 120;


  constructor(private _resultService: ResultService, private router: Router ) { }
  showRateThisButton = false;

  ngOnInit() {
  }

  onClick(resultSelected: IResult): void {
    this.resultSelected = resultSelected;
    this.router.navigate(['results/resultDetail']);

  }

  ngOnDestroy() {
    this._resultService.setResultStorage(this.resultSelected);
 }

}
