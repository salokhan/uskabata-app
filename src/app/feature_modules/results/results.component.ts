import { Component, OnInit } from '@angular/core';
import { IResult } from './result';
import { ResultService } from './service-result/result.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  providers: [ResultService]
})
export class ResultsComponent implements OnInit {

  pagedResults: IResult[];
  errorMessage: string;
  isGridView = false;

  constructor() { }

  ngOnInit() {
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
