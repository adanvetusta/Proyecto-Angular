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

  picture: File;

  tempPicture: any;

  constructor(public _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
    console.log('Usuario constructor', this.usuario);
  }

  ngOnInit(): void {
  }

  save(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }
    this._usuarioService.actualizarUsuario(this.usuario).subscribe(res => {
      console.log(res);
    });
  }

  selectPicture(file: File) {
    if (!file) {
      this.picture = null;
      return;
    }

    if (file.type.indexOf('image') < 0) {
      console.log("no es una imagen");
      return;
    }
    this.picture = file;

    // JS puro
    const reader = new FileReader();
    const urlTemp = reader.readAsDataURL(file);
    reader.onloadend = () => this.tempPicture = reader.result;
  }

  changePicture() {
    this._usuarioService.changePicture(this.picture, this.usuario._id);
  }

}
