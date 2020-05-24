import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICE} from '../../config/config';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient
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
}
