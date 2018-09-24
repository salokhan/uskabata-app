import { Component, OnInit, Input } from '@angular/core';
import { IResult } from '../result';
@Component({
  selector: 'app-results-listview',
  templateUrl: './results-listview.component.html',
  styleUrls: ['./results-listview.component.scss'],
})
export class ResultsListViewComponent implements OnInit {

  @Input() results: IResult[];
  imageHeight = 120;


  constructor( ) { }

  ngOnInit() {
  }

}
