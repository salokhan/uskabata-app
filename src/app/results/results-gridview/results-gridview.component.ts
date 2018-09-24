import { Component, OnInit, Input } from '@angular/core';
import { IResult } from '../result';
@Component({
  selector: 'app-results-gridview',
  templateUrl: './results-gridview.component.html',
  styleUrls: ['./results-gridview.component.scss'],
})
export class ResultsGridviewComponent implements OnInit {

  @Input() results: IResult[];
  imageHeight = 120;


  constructor( ) { }

  ngOnInit() {
  }

}
