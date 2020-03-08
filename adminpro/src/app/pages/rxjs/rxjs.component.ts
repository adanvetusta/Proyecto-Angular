import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';



@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.regresaObservable()
    .subscribe(numero => console.log('subs', numero),
      error => console.error('Error', error),
      () => console.log('El observador terminó')
    );

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log('La página se va a cerrar');
    this.subscription.unsubscribe();
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
        /*if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }*/
      }, 1000);
    }).pipe(
      // Aplicar una función a todos los elementos que se devuelvan
      map( (resp: NumeroValor) => {
        return resp.valor + 1;
      }),
      // Recibe dos argumentos: valor e index (número de veces que se ha llamado al filter)
      filter( (valor, index) => {
        // Números impares
        return valor % 2 === 1;
      }
      )
    );
  }
}

interface NumeroValor {
  valor: number;
}
