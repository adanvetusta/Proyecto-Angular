import { Component, OnInit } from '@angular/core';
import {UploadFileService} from '../../services/service.index';
import {ModalUploadService} from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  picture: File;

  tempPicture: any;

  constructor(public _uploadFileService: UploadFileService,
              public _modalUploadService: ModalUploadService) {
    console.log('modal listo');
  }

  ngOnInit(): void {
  }

  selectPicture(file: File) {
    if (!file) {
      this.picture = null;
      return;
    }

    if (file.type.indexOf('image') < 0) {
      console.log('no es una imagen');
      return;
    }
    this.picture = file;

    // JS puro
    const reader = new FileReader();
    const urlTemp = reader.readAsDataURL(file);
    reader.onloadend = () => this.tempPicture = reader.result;
  }

  subirImagen() {
    this._uploadFileService.uploadFile(this.picture, this._modalUploadService.tipo, this._modalUploadService.id)
      .then(res => {
        console.log(res);
        this._modalUploadService.notificacion.emit(res);
        this.cerrarModal();
      })
      .catch(err => {
        console.log('Error en la carga');
      });
  }

  cerrarModal() {
    this.tempPicture = null;
    this.picture = null;
    this._modalUploadService.ocultarModal();
  }

}
