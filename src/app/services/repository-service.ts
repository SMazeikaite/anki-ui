import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { IRepositoryService } from './irepository-service';
import { IApiService } from './iapi-service';
import { ReviewedCardsPerDay } from '../models/reviewedCardsPerDay.model';
import { Deck } from '../models/deck.model';

const DEFAULT_DECK_ID = 1;

@Injectable({
  providedIn: 'root',
})
export class RepositoryService implements IRepositoryService {
  constructor(private api: IApiService) {}

  getProfiles(): Observable<string[]> {
    return this.api.invoke('getProfiles');
  }

  getDeckNames(): Observable<string[]> {
    return this.api.invoke('deckNames');
  }

  getDeckNamesAndIds(): Observable<Deck[]> {
    return this.api.invoke<Record<string, number>>('deckNamesAndIds').pipe(
      map((decks) => {
        let mapped: Deck[] = [];
        for (let key in decks) {
          const path = key.split('::');
          const visualName = path ? path[Object.keys(path).length - 1] : key;

          decks[key] !== DEFAULT_DECK_ID &&
            mapped.push({ id: decks[key], name: key, visualName, path });
        }
        return mapped;
      })
    );
  }

  getModelNames(): Observable<string[]> {
    return this.api.invoke('modelNames');
  }

  getNumCardsReviewedToday(): Observable<number> {
    return this.api.invoke('getNumCardsReviewedToday');
  }

  getNumCardsReviewedByDay(): Observable<ReviewedCardsPerDay[]> {
    return this.api
      .invoke<ReviewedCardsPerDay[]>('getNumCardsReviewedByDay')
      .pipe(
        map((record) => {
          console.log('record', record);
          return record;
        })
      );
  }
}
