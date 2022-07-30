import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { fakeCoords } from '../../constants/fake-data.fake';

import { TGeocoding } from '../../models/geocoding.model';

import { ErrorLoggingService } from '../error-logging/error-logging.service';
import { GeocodingService } from './geocoding.service';

describe('GeocodingService', () => {
  let geocodingService: GeocodingService;
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
        GeocodingService,
        { provide: HttpClient, useValue: httpSpy },
        { provide: ErrorLoggingService, useValue: errorLoggingServiceSpy}
      ]
    });

    geocodingService = TestBed.inject(GeocodingService);
    errorLoggingServiceMock = TestBed.inject(ErrorLoggingService) as jasmine.SpyObj<ErrorLoggingService>;
    httpClientMock = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(geocodingService).toBeTruthy();
  });

  it('should return coordinates (HttpClient called once)', (done: DoneFn) => {
    const expectedGeoCoordinates: TGeocoding[] = [fakeCoords];

    httpClientMock.get.and.returnValue(of(expectedGeoCoordinates));

    geocodingService.getCoordinates('Owerri').subscribe({
      next: coords => {
        expect(coords)
          .withContext('expected geocoordinates')
          .toEqual(expectedGeoCoordinates);
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

    geocodingService.getCoordinates('Owerri').subscribe({
      next: city => done.fail('expected an error, not city'),
      error: error => {
        expect(errorLoggingServiceMock.handleError).toHaveBeenCalled();
        done();
      }
    })
  });
});
