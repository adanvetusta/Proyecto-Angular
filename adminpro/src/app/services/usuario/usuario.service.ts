import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../../config/config';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient, public router: Router) {
    this.cargarStorage();
  }

  isLogged(): boolean {
    return (this.token.length > 5);
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    console.log('USUARIO BACK', usuario);
    this.usuario = usuario;
    console.log('USUARIO SAVED', this.usuario);
    this.token = token;
  }

  loginGoogle(token: string) {
    const url = URL_SERVICE + '/login/google';
    return this.http.post(url, { token }).pipe(
      map((res: any) => {
        this.guardarStorage(res.id, res.token, res.usuario);
        return true;
      })
    );
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    const url = URL_SERVICE + '/login';
    return this.http.post(url, usuario).pipe(
      map((res: any) => {
        this.guardarStorage(res.id, res.token, res.usuario);
        return true;
      })
    );
  }

  logout() {
    this.usuario = null;
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
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

  actualizarUsuario(usuario: Usuario) {
    const url = URL_SERVICE + '/usuario/' + usuario._id + '/?token=' + this.token;
    return this.http.put(url, usuario);
  }
}
