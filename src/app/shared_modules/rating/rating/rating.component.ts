import { Component, OnInit, OnChanges , Input } from '@angular/core';

import { storeCleanupWithContext } from '@angular/core/src/render3/instructions';
import { IRating } from '../rating';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit, OnChanges {

  showRatingControl = false;
  @Input() ratings: IRating;
  @Input() showRateThisButton: true;
  calculatedRating;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.ratings) {
      this.calculateRating();
    }
  }

  enableRatingControl(): void {
    this.showRatingControl = !this.showRatingControl;
  }

  calculateRating(): void {
    const ratingFactorFirst = (1 * this.ratings.onestarRating);
    const ratingFactorSecond = (2 * this.ratings.twostarRating);
    const ratingFactorThird = (3 * this.ratings.threestarRating);
    const ratingFactorFourth = (4 * this.ratings.fourstarRating);
    const ratingFactorFifth = (5 *  this.ratings.fivestarRating);

    const sumOfRatingFactor = ratingFactorFirst + ratingFactorSecond + ratingFactorThird + ratingFactorFourth + ratingFactorFifth;
    const calculatedRating = sumOfRatingFactor / this.sumAllRating();

    this.calculatedRating = Math.round(calculatedRating * 100) / 100;
  }

  sumAllRating(): number {
    return this.ratings.fivestarRating + this.ratings.fourstarRating +
      this.ratings.threestarRating + this.ratings.twostarRating + this.ratings.onestarRating;
  }

  ratingClicked(value: number): void {
    console.log(value);
  }

}
