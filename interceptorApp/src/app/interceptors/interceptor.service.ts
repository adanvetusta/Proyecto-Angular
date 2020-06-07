import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    const headers = new HttpHeaders({
      'token-usuario': 'ABC1234567890'
    });

    // Añadimos headers, params...
    const reqClone = req.clone({
      headers
    });

    return next.handle(reqClone).pipe(
      catchError(this.manejarError)
    );
  }

  manejarError(error: HttpErrorResponse) {
    console.log('ERROR INTERCEPTADO');
    console.warn(error);
    return throwError('Error personalizado');
  }
}
