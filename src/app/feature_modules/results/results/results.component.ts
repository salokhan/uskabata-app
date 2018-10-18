import { Component, OnInit } from '@angular/core';
import { IResult } from '../result';
import { ResultService } from '../service-result/result.service';
import { ActivatedRoute } from '@angular/router';
import { IFilter } from '../../../shared_modules/filter';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  filter: IFilter;
  results: IResult[];
  pagedResults: IResult[];
  errorMessage: string;
  isGridView = false;

  constructor(private _resultService: ResultService, private _activeRoutes: ActivatedRoute) {
    this._activeRoutes.params.subscribe(params => {
      this.filter = <IFilter>params;
    });
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
