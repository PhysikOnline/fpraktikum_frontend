import { Component } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  hasSendRating = false;
  hasRated = false;
  rating: number;
  ratingFeedbackText = null;
  ratingDetailText: string;
  NUMER_OF_STARS = 5;
  ratingSnackText: string;

  constructor(private alert: AlertService) { }

  onRating(ratingEvent) {
    this.rating = ratingEvent.rating / this.NUMER_OF_STARS;
    this.hasRated = true;

    if (this.rating >= 0.75) {
      this.ratingSnackText = 'RATING_THANKS_GOOD';
      this.ratingDetailText = 'RATING_DETAIL_GOOD';
    } else if (this.rating > 0.4) {
      this.ratingSnackText = 'RATING_THANKS_MIDDLE';
      this.ratingDetailText = 'RATING_DETAIL_MIDDLE';
    } else {
      this.ratingSnackText = 'RATING_THANKS_BAD';
      this.ratingDetailText = 'RATING_DETAIL_BAD';
    }
  }

  resetRating() {
    this.hasRated = false;
    this.rating = null;
    this.ratingDetailText = '';
  }

  sendRating() {
    this.alert.showSnack(this.ratingSnackText);
    this.hasSendRating = true;
  }
}
