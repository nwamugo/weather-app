import { Observable } from "rxjs";
import { TCurrentWeather } from "./current-weather.model";

export interface IWeatherService {
  getWeather(lat: number, lon: number): Observable<TCurrentWeather>
}