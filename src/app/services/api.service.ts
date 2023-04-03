import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { IApiService } from './iapi-service';

const ANKI_PORT = 8765;
const ANKI_VERSION = 6;

interface AnkiHttpResponse<T> {
  error: string;
  result: T;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService implements IApiService {
  constructor(private http: HttpClient) {}

  // Should probably be not so ANKI-specific?
  invoke<T>(action: string, params?: any, headers?: any): Observable<T> {
    return this.http
      .post<AnkiHttpResponse<T>>(`http://127.0.0.1:${ANKI_PORT}`, {
        action: action,
        version: ANKI_VERSION,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => this.catchError(error)),
        map((response: AnkiHttpResponse<T>) => {
          if (response.error) {
            throw Error(response.error);
          }
          return response.result;
        })
      );
  }

  private catchError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => new Error(error.message));
  }
}
