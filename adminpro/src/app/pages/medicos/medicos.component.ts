import { Component, OnInit } from '@angular/core';
import {Medico} from '../../models/medico.model';
import {MedicoService} from '../../services/medico/medico.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];

  constructor(
    public _medicosService: MedicoService
  ) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this._medicosService.cargarMedicos().subscribe(medicos => {
      this.medicos = medicos;
    });
  }

}
