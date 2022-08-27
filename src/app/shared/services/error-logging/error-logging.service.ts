import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorLoggingService {

  constructor(private snackbar: MatSnackBar) { }

  handleError(error: any): Observable<any> {
    this.snackbar.open(error.message, 'CLOSE');
    return of()
  }
}
