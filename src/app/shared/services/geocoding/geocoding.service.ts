import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


import { environment } from 'src/environments/environment';
import { TGeocoding } from './../../models/geocoding';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  constructor(private http: HttpClient, private snackbar: MatSnackBar) { }

  getCoordinates(city: string): Observable<TGeocoding[]> {
    const options = new HttpParams()
                      .set('q', city)
                      .set('appid', environment.apiKey)

    return this.http.get<TGeocoding[]>(environment.baseUrl + 'geo/1.0/direct', { params: options } )
      .pipe(
        tap(result => {
          if (!result.length) throw new TypeError('City not found')
        }),
        catchError((errors: any) => this.handleError(errors))
    )
  }

  handleError(errors: any): Observable<any> {
    this.snackbar.open(errors.message)._dismissAfter(3000)
    return of()
  }
}
