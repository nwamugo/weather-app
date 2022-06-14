import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from 'src/environments/environment';

import { CurrentWeather } from '../../models/current-weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient,
    private snackbar: MatSnackBar
  ) { }

  getWeather(lat: number, lon: number): Observable<CurrentWeather> {
    const options = new HttpParams()
                      .set('lat', lat)
                      .set('lon', lon)
                      .set('units', 'metric')
                      .set('appid', environment.apiKey);

    return this.http.get<CurrentWeather>(environment.baseUrl + 'data/2.5/weather', { params: options })
    .pipe(
      tap(console.log),
      catchError((errors: any) => this.handleError(errors))
    )
  }

  handleError(errors: any): Observable<any> {
    this.snackbar.open(errors.message)._dismissAfter(3000)
    return of()
  }
}
