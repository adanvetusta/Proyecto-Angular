import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public http: HttpClient) {
    console.log('Servicio de usuario listo');
  }

  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICE + '/usuario';
    return this.http.post(url, usuario)
      .pipe(
        map(
          (res: any) => {
            return res.usuario;
          }
        )
      );
  }
}
