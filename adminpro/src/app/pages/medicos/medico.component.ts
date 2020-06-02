import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Hospital} from '../../models/hospital.model';
import {HospitalService} from '../../services/hospital/hospital.service';
import {Medico} from '../../models/medico.model';
import {MedicoService} from '../../services/medico/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {


  hospitales: Hospital[] = [];
  medico: Medico = new Medico();
  constructor(public _hospitalService: HospitalService, public _medicoService: MedicoService) { }

  ngOnInit(): void {
    this._hospitalService.cargarHospitales().subscribe( hospitales => {
      this.hospitales = hospitales;
    });
  }

  guardarMedico( f: NgForm) {
    if (f.invalid) {
      return;
    }
    this._medicoService.guardarMedico(this.medico).subscribe(medico => {
      Swal.fire('Médico creado', 'Operación realizada correctamente', 'success');
    });
  }
}
