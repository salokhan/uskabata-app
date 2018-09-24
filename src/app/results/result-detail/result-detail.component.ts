import { Component, OnInit } from '@angular/core';
import { ResultService } from '../service-result/result.service';
import { IResult } from '../result';

@Component({
  // selector: 'app-result-detail',
  templateUrl: './result-detail.component.html',
  styleUrls: ['./result-detail.component.scss']
})
export class ResultDetailComponent implements OnInit {

  result: IResult;

  constructor(private _resultService: ResultService) {
  }

  ngOnInit() {
    this.result = this._resultService.getResultStorage();
    console.log(this.result);
  }

}
