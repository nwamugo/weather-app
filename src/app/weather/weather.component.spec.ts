import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { WeatherComponent } from './weather.component';

import { WeatherService } from './../shared/services/weather/weather.service';
import { GeocodingService } from '../shared/services/geocoding/geocoding.service';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherComponent ],
      // providers: [
      //   {
      //     provide: WeatherService,
      //     useClass: FakeWeatherService
      //   },
      //   {
      //     provide: GeocodingService,
      //     useValue: mockGeocodingService
      //   }
      // ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
