import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Hospital} from '../../models/hospital.model';
import {HospitalService} from '../../services/hospital/hospital.service';
import {Medico} from '../../models/medico.model';
import {MedicoService} from '../../services/medico/medico.service';
import Swal from 'sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalUploadService} from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {


  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', null, '');
  hospital: Hospital = new Hospital('');

  constructor(public _hospitalService: HospitalService, public _medicoService: MedicoService, public router: Router, private activatedRoute: ActivatedRoute, public _modalUploadService: ModalUploadService) { }

  ngOnInit(): void {
    this._hospitalService.cargarHospitales().subscribe( hospitales => {
      this.hospitales = hospitales;
      if (this.activatedRoute.snapshot.params.id !== 'nuevo') {
        this.cargarMedico(this.activatedRoute.snapshot.params.id);
      }
    });
    this._modalUploadService.notificacion.subscribe(res => {
        this.medico.img = res.medico.img;
    });
  }


  cargarMedico(id: string) {
    this._medicoService.cargarMedico(id).subscribe(medico => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });
  }



  guardarMedico( f: NgForm) {
    if (f.invalid) {
      return;
    }
    this._medicoService.guardarMedico(this.medico).subscribe(medico => {
      Swal.fire('OK.', 'Operación realizada correctamente', 'success');
      this.medico._id = medico._id;
      this.router.navigate(['/medico', medico._id]);
    });
  }

  cambioHospital(id: string) {
    this._hospitalService.obtenerHospital(id).subscribe( hospital => {
      this.hospital = hospital;
    });
  }

  cambiarFoto() {
    this._modalUploadService.mostrarModal('medicos', this.medico._id);
  }
}
