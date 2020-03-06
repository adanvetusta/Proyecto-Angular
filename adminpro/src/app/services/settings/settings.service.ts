import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
   }

  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      console.log('Cargando del local storage...')
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema(this.ajustes.tema);
    } else {
      console.log('Cargando valores por defecto...');
    }
  }

  aplicarTema(tema: string) {
    const url = `assets/css/colors/${tema}.css`;
    this._document.getElementById('tema').setAttribute('href', url);
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.guardarAjustes();
  }

  guardarAjustes() {
    console.log('Guardado en el localStorage...');
    /*
    No hace falta importar el localStorage.
    JSON.stringify('') -->  Sólo guarda objetos de tipo String.
    */
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}