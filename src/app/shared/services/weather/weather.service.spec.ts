import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { TCurrentWeather } from '../../models/current-weather.model';
import { fakeWeather } from '../../constants/fake-data.fake';

import { WeatherService } from './weather.service';
import { ErrorLoggingService } from './../error-logging/error-logging.service';

describe('WeatherService', () => {
  let weatherService: WeatherService;
  let errorLoggingServiceMock: jasmine.SpyObj<ErrorLoggingService>;
  let httpClientMock: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const errorLoggingServiceSpy = jasmine.createSpyObj(
      'ErrorLoggingService',
      ['handleError']
    );
    TestBed.configureTestingModule({
      providers: [
        WeatherService,
        { provide: HttpClient, useValue: httpSpy },
        { provide: ErrorLoggingService, useValue: errorLoggingServiceSpy }
      ]
    });
    weatherService = TestBed.inject(WeatherService);
    errorLoggingServiceMock = TestBed.inject(ErrorLoggingService) as jasmine.SpyObj<ErrorLoggingService>;
    httpClientMock = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });


  it('should be created', () => {
    expect(weatherService).toBeTruthy();
  });

  it('should return current weather (HttpClient called once)', (done: DoneFn) => {
    const expectedWeather: TCurrentWeather = fakeWeather;

    httpClientMock.get.and.returnValue(of(expectedWeather));

    weatherService.getWeather(90, 23).subscribe({
      next: weather => {
        expect(weather)
          .withContext('expected weather')
          .toEqual(expectedWeather);
        done();
      },
      error: done.fail
    });
    expect(httpClientMock.get.calls.count())
      .withContext('one call')
      .toBe(1)
  })

  it('should return an error when the server returns a 404', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found'
    });

    httpClientMock.get.and.returnValue(throwError(() => errorResponse));

    weatherService.getWeather(45, 67).subscribe({
      next: weather => done.fail('expected an error, not weather'),
      error: error => {
        expect(errorLoggingServiceMock.handleError).toHaveBeenCalled();
        done();
      }
    })
  });
});
