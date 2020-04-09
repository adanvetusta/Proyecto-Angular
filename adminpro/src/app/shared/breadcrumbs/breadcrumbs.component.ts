import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;

  constructor(private router: Router) {
    this.getDataRoute()
    .subscribe( data => {
      this.titulo = data.titulo;
    });
   }

  ngOnInit(): void {
  }

  getDataRoute() {
    return this.router.events.pipe(
      // Solo nos interesan los que sean una instancia del ActivationEnd
      filter(evento => evento instanceof ActivationEnd),
      // Solo nos interesa el que tenga el firstChild igual a null (entiendo que es porque no tiene hijos y es en el que se está)
      filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null),
      // Solo quiero extraer la data (como un aspersor de agua)
      map( (evento: ActivationEnd) => evento.snapshot.data)
    );
  }

}
