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
  result: IResult;
  imageHeight = 120;


  constructor(private _resultService: ResultService, private router: Router ) { }

  ngOnInit() {
  }

  onClick(result: IResult): void {
    this.result = result;
    this.router.navigate(['result-detail']);

  }

  ngOnDestroy() {
    this._resultService.setResultStorage(this.result);
 }

}
