import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICE} from '../../config/config';
import {map} from 'rxjs/operators';
import {UsuarioService} from '../usuario/usuario.service';
import {Hospital} from '../../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;

  constructor(public http: HttpClient, public _usuarioService: UsuarioService) { }

  cargarHospitales() {
    const url = URL_SERVICE + '/hospital';
    return this.http.get(url).pipe(
      map((res: any) =>  {
        this.totalHospitales = res.total;
        return res.hospitales;
      })
    );
  }

  obtenerHospital(id: string) {
    const url = URL_SERVICE + '/hospital/' + id;
    return this.http.get(url).pipe(
      map((res: any) => res.hospital)
    );
  }

   borrarHospital(id: string) {
      const url = URL_SERVICE + '/hospital/' + id + '?token=' + this._usuarioService.token;
      return this.http.delete(url).pipe(
        map(res => {
          console.log('Hospital borrado');
        })
      );
   }

   crearHospital(nombre: string) {
      const url = URL_SERVICE + '/hospital?token=' + this._usuarioService.token;
      return this.http.post(url, {nombre}).pipe(
        map(
          (res: any) =>  res.hospital
        )
      );
   }

  buscarHospital(termino: string) {
    const url = URL_SERVICE + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url).pipe(
      map( (res: any) => res.hospitales
      )
    );
  }

  actualizarHospital(hospital: Hospital) {
    const url = URL_SERVICE + '/hospital/' + hospital._id + '/?token=' + this._usuarioService.token;
    return this.http.put(url, hospital).pipe(
      map(
        (res: any) =>  res.hospital
      )
    );
  }
}
