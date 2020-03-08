import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.scss']
})
export class PromesasComponent implements OnInit {

  constructor() {
    let promesa = new Promise((resolve, reject) => {
      let contador = 0;
      const intervalo = setInterval(() => {
        contador += 1;
        console.log(contador);
        if (contador === 3) {
          resolve('OK!');
          //reject('Simplemente un error...');
          clearInterval(intervalo);
        }
      }, 1000);
    });
    promesa.then(mensaje => {
      console.log('Terminó', mensaje);
    }
    ).catch( error => {
      console.error('Error en la promesa', error);
    });
  }

  ngOnInit(): void {
  }

}
