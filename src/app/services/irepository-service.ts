import { Observable } from 'rxjs';
import { ReviewedCardsPerDay } from '../models/reviewedCardsPerDay.model';
import { Deck } from '../models/deck.model';

export abstract class IRepositoryService {
  abstract getProfiles(): Observable<string[]>;
  abstract getDeckNames(): Observable<string[]>;
  abstract getDeckNamesAndIds(): Observable<Deck[]>;
  abstract getModelNames(): Observable<string[]>;
  abstract getNumCardsReviewedToday(): Observable<number>;
  abstract getNumCardsReviewedByDay(): Observable<ReviewedCardsPerDay[]>;
}
