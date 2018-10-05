import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { IResult } from '../result';
import { Router } from '@angular/router';
import { ResultService } from '../service-result/result.service';
@Component({
  selector: 'app-results-gridview',
  templateUrl: './results-gridview.component.html',
  styleUrls: ['./results-gridview.component.scss'],
})
export class ResultsGridviewComponent implements OnInit, OnDestroy {

  @Input() results: IResult[];
  resultSelected: IResult;
  imageHeight = 120;


  constructor(private _resultService: ResultService, private router: Router ) { }

  ngOnInit() {

  }

  onClick(resultSelected: IResult): void {
    this.resultSelected = resultSelected;
    this.router.navigate(['result-detail']);
  }

  ngOnDestroy() {
    this._resultService.setResultStorage(this.resultSelected);
  }

}
