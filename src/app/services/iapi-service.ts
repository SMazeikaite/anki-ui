import { Observable } from 'rxjs';

export abstract class IApiService {
  abstract invoke<T>(
    action: string,
    params?: any,
    headers?: any
  ): Observable<T>;
}
