import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


import { environment } from 'src/environments/environment';
import { TGeocoding } from './../../models/geocoding';
import { ErrorLoggingService } from '../error-logging/error-logging.service';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  constructor(
    private http: HttpClient,
    private errorlogging: ErrorLoggingService
  ) { }

  getCoordinates(city: string): Observable<TGeocoding[]> {
    const options = new HttpParams()
                      .set('q', city)
                      .set('appid', environment.apiKey)

    return this.http.get<TGeocoding[]>(environment.baseUrl + 'geo/1.0/direct', { params: options } )
      .pipe(
        tap(result => {
          if (!result.length) throw new TypeError('City not found')
        }),
        catchError((errors: any) => this.errorlogging.handleError(errors))
    )
  }
}
