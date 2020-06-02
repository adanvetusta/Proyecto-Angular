import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICE} from '../../config/config';
import {map} from 'rxjs/operators';
import {UsuarioService} from '../usuario/usuario.service';
import {Medico} from '../../models/medico.model';
import {URL} from 'url';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos() {
    const url = URL_SERVICE + '/medico';
    return this.http.get(url).pipe(
      map(
        (res: any) => {
          this.totalMedicos = res.total;
          console.log('Medicos', res.medicos);
          return res.medicos;
        }
      )
    );
  }

  buscarMedicos(termino: string) {
    const url = URL_SERVICE + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url).pipe(
      map( (res: any) => res.medicos
      )
    );
  }

  borrarMedico(id) {
    const url = URL_SERVICE + '/medico/' + id + '/?token=' + this._usuarioService.token;
    return this.http.delete(url);
  }

  guardarMedico(medico: Medico) {

    if (medico._id) {
      // Actualizando
      const url = URL_SERVICE + '/medico/' + medico._id + '?token=' + this._usuarioService.token;;
      return this.http.put(url, medico).pipe(
        map((res: any) => {
          return res.medico;
        })
      );

    } else {
      // Creando
      const url = URL_SERVICE + '/medico?token=' + this._usuarioService.token;
      return this.http.post(url, medico).pipe(
        map(
          (res: any) => {
            return res.medico;
          }
        )
      );
    }
  }

  cargarMedico(id: string) {
    const url = URL_SERVICE + '/medico/' + id;
    return this.http.get(url).pipe(
      map(
        (res: any) => {
          return res.medico;
        }
      )
    );
  }
}
