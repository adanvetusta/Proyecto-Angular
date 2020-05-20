import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICE} from '../../config/config';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;

  constructor(public http: HttpClient) { }

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
}
