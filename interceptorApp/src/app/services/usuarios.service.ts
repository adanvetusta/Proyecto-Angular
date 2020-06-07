import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }


  obtenerUsuarios() {
    let params = new HttpParams().append('page', '1');
    params = params.append('nombre', 'Fernando Herrera');

    /* const headers = new HttpHeaders({
      'token-usuario': 'ABC1234567890'
    }); */

    return this.http.get('https://reqres.in/api/users', {
      params,
      //headers
    }).pipe(
      map(res => {
          return res['data'];
        }
      ),
      catchError( this.manejarError )
    );
  }

  manejarError(error: HttpErrorResponse) {
    console.log('Sucedió algún error');
    console.warn(error);
    return throwError('Error personalizado');
  }
}
