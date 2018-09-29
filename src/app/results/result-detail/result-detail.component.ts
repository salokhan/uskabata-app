import { Component, OnInit, OnDestroy } from '@angular/core';
import { ResultService } from '../service-result/result.service';
import { IResult } from '../result';
import { Router } from '@angular/router';

@Component({
  // selector: 'app-result-detail',
  templateUrl: './result-detail.component.html',
  styleUrls: ['./result-detail.component.scss']
})
export class ResultDetailComponent implements OnInit, OnDestroy {

  result: IResult;

  constructor(private _resultService: ResultService, private router: Router) {
  }

  ngOnInit() {
    this.result = this._resultService.getResultStorage();
    if (!this.result) {
      this.router.navigate(['']);
    }
  }

  ngOnDestroy() {
    // this._resultService.clearResultStorage();
  }

}
