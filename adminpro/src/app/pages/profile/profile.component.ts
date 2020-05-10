import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  constructor(public _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
    console.log('Usuario constructor', this.usuario);
  }

  ngOnInit(): void {
  }

  save(usuario: Usuario) {
    console.log(this.usuario);
    this.usuario.nombre = usuario.nombre;
    this.usuario.email = usuario.email;
    this._usuarioService.actualizarUsuario(this.usuario).subscribe(res => {
      console.log(res);
    });
  }

}
