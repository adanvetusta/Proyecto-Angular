import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public _usuarioService: UsuarioService) { }


  usuario: Usuario;
  ngOnInit(): void {
    this.usuario = this._usuarioService.usuario;
  }

}
