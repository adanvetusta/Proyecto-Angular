import { Component, OnInit } from '@angular/core';
import {Hospital} from '../../models/hospital.model';
import {HospitalService} from '../../services/hospital/hospital.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];

  constructor(public _hospitalService: HospitalService) { }

  ngOnInit(): void {
    this.cargarHospitales();
  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales()
      .subscribe(hospitales => this.hospitales = hospitales);
  }

  guardarHospital(hospital: Hospital) {

  }

  borrarHospital(hospital: Hospital) {

  }

}
