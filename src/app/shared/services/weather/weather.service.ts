import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { TCurrentWeather } from '../../models/current-weather.model';
import { ErrorLoggingService } from '../error-logging/error-logging.service';
import { IWeatherService } from '../../models/weatherservice.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService implements IWeatherService {

  constructor(
    private http: HttpClient,
    private errorlogging: ErrorLoggingService
  ) { }

  getWeather(lat: number, lon: number): Observable<TCurrentWeather> {
    const options = new HttpParams()
                      .set('lat', lat)
                      .set('lon', lon)
                      .set('units', 'metric')
                      .set('appid', environment.apiKey);

    return this.http.get<TCurrentWeather>(environment.baseUrl + 'data/2.5/weather', { params: options })
    .pipe(
      tap(console.log),
      catchError((error: any) => this.errorlogging.handleError(error))
    )
  }
}
