import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorLoggingService {

  constructor(private snackbar: MatSnackBar) { }

  handleError(errors: any): Observable<any> {
    this.snackbar.open(errors.message)._dismissAfter(3000)
    return of()
  }
}
