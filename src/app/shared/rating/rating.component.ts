import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  showRatingControl = false;
  constructor() { }

  ngOnInit() {
  }

  enableRatingControl(): void {
    this.showRatingControl = !this.showRatingControl;
  }

}
