import { Injectable } from '@angular/core';
import { URL_SERVICE } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  /**
   * Cualquier archivo (JS puro)
   */
  uploadFile(file: File, tipo: string, id: string) {

    return new Promise ( (resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();
      formData.append('imagen', file, file.name);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Subida Ok');
            resolve(xhr.response);
          } else {
            console.log('Falló la subida');
            reject(xhr.response);
          }
        }
      };
      const url = URL_SERVICE + '/upload/' + tipo + '/' + id;
      xhr.open('PUT', url, true);
      xhr.send(formData);
    });
  }
}
