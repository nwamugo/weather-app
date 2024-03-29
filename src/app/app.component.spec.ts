import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    const mockSnackbarSpy = jasmine.createSpyObj('MatSnackBar', ['open'])
    const mockUpdatesSpy = jasmine.createSpyObj('MatSnackBar', ['open'])

    await TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      providers: [
        AppComponent,
        { provide: MatSnackBar, useValue: mockSnackbarSpy },
        { provide: SwUpdate, useValue: mockUpdatesSpy }
      ]
    }).compileComponents();
  });

  afterEach(() => {
    fixture.destroy();
  })

  it('should create the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
