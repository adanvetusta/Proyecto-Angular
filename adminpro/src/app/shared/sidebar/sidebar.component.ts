import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public _sidebar: SidebarService, public _usuarioService: UsuarioService) { }

  usuario: Usuario;
  ngOnInit(): void {
    this.usuario = this._usuarioService.usuario;
    this._sidebar.cargarMenu();
  }

}
