import { Component, OnInit } from '@angular/core';
import { IResult } from '../result';
import { ResultService } from '../service-result/result.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  results: IResult[];
  pagedResults: IResult[];
  errorMessage: string;
  isGridView = false;

  constructor(private _resultService: ResultService) {
   }

  ngOnInit() {
    this._resultService.getResult().subscribe(results => {
      this.results = results;
    },
      error => {
        this.errorMessage = <any>error;
      });
  }

  onNotify(pagedResults: IResult[]): void {
    this.pagedResults = pagedResults;
  }

  gridViewClicked(): void {
    this.isGridView = true;
  }
  listViewClicked(): void {
    this.isGridView = false;
  }

}
