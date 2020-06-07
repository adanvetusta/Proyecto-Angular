import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { pipe, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UploadFileService } from '../service.index';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(public http: HttpClient, public router: Router, public _uploadFileService: UploadFileService) {
    this.cargarStorage();
  }

  isLogged(): boolean {
    return (this.token.length > 5);
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  loginGoogle(token: string) {
    const url = URL_SERVICE + '/login/google';
    return this.http.post(url, { token }).pipe(
      map((res: any) => {
        this.guardarStorage(res.id, res.token, res.usuario, res.menu);
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
        this.guardarStorage(res.id, res.token, res.usuario, res.menu);
        return true;
      }),
      catchError(err => {
        console.log(err.error.mensaje);
        // Posibilidad de crear un servicio centralizado de manejo de errores
        Swal.fire('Error en el login',  'Credenciales incorrectas', 'error');
        return Observable.throw(err);
      })
    );
  }

  logout() {
    this.usuario = null;
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
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
        ),
        catchError(err => {
          Swal.fire(err.error.mensaje, err.error.errors.message, 'error');
          return Observable.throw(err);
        })
      );
  }

  actualizarUsuario(usuario: Usuario) {
    const url = URL_SERVICE + '/usuario/' + usuario._id + '/?token=' + this.token;
    return this.http.put(url, usuario).pipe(
      map((res: any) => {
        if (usuario._id === this.usuario._id) {
          this.guardarStorage(res.usuario._id, this.token, res.usuario, this.menu);
        }
        return true;
      }),
      catchError(err => {
        Swal.fire(err.error.mensaje, err.error.errors.message, 'error');
        return Observable.throw(err);
      })
    );
  }

  changePicture(file: File, id: string) {
    this._uploadFileService.uploadFile(file, 'usuarios', id)
      .then((res: any) => {
        this.usuario.img = res.usuario.img;
        this.guardarStorage(id, this.token, this.usuario, this.menu);
      }).catch(res => {
        console.log(res);
      });
  }

  cargarUsuarios(desde: number = 0) {
    const url = URL_SERVICE + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {
    const url = URL_SERVICE + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url).pipe(
      map( (res: any) => res.usuarios
      )
    );
  }

  borrarUsuario(id) {
    const url = URL_SERVICE + '/usuario/' + id + '/?token=' + this.token;
    return this.http.delete(url);
  }
}
