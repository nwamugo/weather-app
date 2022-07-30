import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isEmpty } from 'rxjs';

import { ErrorLoggingService } from './error-logging.service';

describe('ErrorLoggingService', () => {
  let errorLoggingService: ErrorLoggingService;
  let matSnackbarMock: jasmine.SpyObj<MatSnackBar>;


  beforeEach(() => {
    const snackbarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [
        ErrorLoggingService,
        { provide: MatSnackBar, useValue: snackbarSpy }
      ]
    });

    errorLoggingService = TestBed.inject(ErrorLoggingService);
    matSnackbarMock = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });


  it('should be created', () => {
    expect(errorLoggingService).toBeTruthy();
  });

  it('should open the snackbar with correct arguments when error occurred', () => {
    const errorObj = {
      message: 'Not Found'
    }
    errorLoggingService.handleError(errorObj);

    expect(matSnackbarMock.open).toHaveBeenCalledWith("Not Found", '', {duration: 3000});
    expect(matSnackbarMock.open).toHaveBeenCalledTimes(1);
  })

  it('#handleError should return an empty observable', (done: DoneFn) => {
    errorLoggingService.handleError({ message: 'Not Found' }).pipe(isEmpty()).subscribe(res => {
      expect(res).toEqual(true);
      done();
    });
  })
});
