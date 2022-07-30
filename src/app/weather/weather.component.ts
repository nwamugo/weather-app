import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';

import { TCurrentWeather } from '../shared/models/current-weather.model';
import { TGeocoding } from '../shared/models/geocoding.model';

import { WeatherService } from '../shared/services/weather/weather.service';
import { GeocodingService } from '../shared/services/geocoding/geocoding.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  weather$: Observable<TCurrentWeather> | undefined;

  constructor(
    private weatherService: WeatherService,
    private geocodingService: GeocodingService,
  ) { }

  ngOnInit(): void {
  }

  search(city: string) {
    this.weather$ = this.geocodingService.getCoordinates(city)
    .pipe(
      concatMap((coords: TGeocoding[]) => this.weatherService.getWeather(coords[0].lat, coords[0].lon))
    )
  }



}
