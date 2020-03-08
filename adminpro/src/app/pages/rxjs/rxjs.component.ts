import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: []
})
export class RxjsComponent implements OnInit {

  constructor() {
    this.regresaObservable()
    .subscribe(numero => console.log('subs', numero),
      error => console.error('Error', error),
      () => console.log('El observador terminó')
    );

  }

  ngOnInit(): void {
  }

  regresaObservable(): Observable<any> {
    return new Observable( observer => {
      let contador = 0;
      const intervalo = setInterval( () => {
        contador += 1;
        const salida: NumeroValor = {
          valor: contador
        };
        observer.next(salida);
        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }
      }, 1000);
    }).pipe(
      // Aplicar una función a todos los elementos que se devuelvan.
      map( (resp: NumeroValor) => {
        return resp.valor + 1;
      })
    );
  }
}

interface NumeroValor {
  valor: number;
}
