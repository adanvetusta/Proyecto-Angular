import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }


  obtenerUsuarios() {
    let params = new HttpParams().append('page', '1');
    params = params.append('nombre', 'Fernando Herrera');

    const headers = new HttpHeaders({
      'token-usuario': 'ABC1234567890'
    });

    return this.http.get('https://reqres.in/api/users', {
      params,
      headers
    });
  }
}
