import { fakeCoords } from './../shared/constants/fake-data.fake';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherComponent } from './weather.component';

import { WeatherService } from './../shared/services/weather/weather.service';
import { GeocodingService } from '../shared/services/geocoding/geocoding.service';
import { TCurrentWeather } from '../shared/models/current-weather.model';
import { first, Observable, of } from 'rxjs';
import { fakeWeather } from '../shared/constants/fake-data.fake';
import { By } from '@angular/platform-browser';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let geocodingServiceMock: jasmine.SpyObj<GeocodingService>;
  let weatherServiceMock: jasmine.SpyObj<WeatherService>;

  beforeEach(async () => {
    const geocodingServiceSpy = jasmine.createSpyObj(
      'GeocodingService',
      ['getCoordinates']
    );
    const weatherServiceSpy = jasmine.createSpyObj(
      'WeatherService',
      ['getWeather']
    );

    await TestBed.configureTestingModule({
      declarations: [ WeatherComponent ],
      providers: [
        {
          provide: WeatherService,
          useValue: weatherServiceSpy
        },
        {
          provide: GeocodingService,
          useValue: geocodingServiceSpy
        }
      ],
    })
    .compileComponents();
    geocodingServiceMock = TestBed.inject(GeocodingService) as jasmine.SpyObj<GeocodingService>;
    weatherServiceMock = TestBed.inject(WeatherService) as jasmine.SpyObj<WeatherService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#search(city) should call the geocodingService', () => {
    geocodingServiceMock.getCoordinates.and.returnValue(of())

    component.search('Owerri')
    expect(geocodingServiceMock.getCoordinates)
      .withContext('after search(city)')
      .toHaveBeenCalledTimes(1)
  })

  it('#search(city) should update the weather', () => {
    geocodingServiceMock.getCoordinates.and.returnValue(of())

    expect(component.weather$)
      .withContext('before search(city)')
      .toBe(undefined)
    component.search('Owerri')
    expect(component.weather$)
      .withContext('before search(city)')
      .toBeDefined()
  })

  it('#search(city) should load weather in Owerri from weatherService', () => {
    geocodingServiceMock.getCoordinates.and.returnValue(of([fakeCoords]));
    weatherServiceMock.getWeather.and.returnValue(of(fakeWeather));

    component.search('Owerri')
    
    expect(component.weather$).toBeDefined();
    component.weather$?.pipe(first()).subscribe(res => {
      expect(res.name).toEqual('Cloudy')
      expect(res.wind.speed).toEqual(30)

      const debugEl = fixture.debugElement
      const titleEl: HTMLElement = debugEl.query(By.css('mat-card-title')).nativeElement;
      expect(titleEl.textContent).toContain('Nigeria')
    })
  })
});
