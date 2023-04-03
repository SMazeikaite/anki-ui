import { IRepositoryService } from '../services/irepository-service';
import { Deck } from '../models/deck.model';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class HomepageService {
  decks: Subject<Deck[]> = new Subject<Deck[]>();
  private _cardsReviewedToday: number;
  constructor(private repo: IRepositoryService) {
    this.repo
      .getNumCardsReviewedToday()
      .subscribe((total) => (this.cardsReviewedToday = total));
  }

  initDecks(): void {
    this.repo.getDeckNamesAndIds().subscribe((decks) => this.decks.next(decks));
  }

  get cardsReviewedToday(): number {
    return this._cardsReviewedToday;
  }

  set cardsReviewedToday(total: number) {
    console.log('total:', total);
    this._cardsReviewedToday = total;
  }

  refreshDecks(): void {
    // TODO refresh
  }
}
