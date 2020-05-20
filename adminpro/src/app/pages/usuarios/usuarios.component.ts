import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  total: number;
  cargando: boolean = true;

  constructor(public _usuarioService: UsuarioService) {
  }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde).subscribe((res: any) => {
      console.log(res);
      this.usuarios = res.usuarios;
      this.total = res.total;
      this.cargando = false;
    });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    console.log(desde);
    if (desde >= this.total) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuarioService.buscarUsuarios(termino).subscribe(
      (usuarios: Usuario[]) => {
        console.log(usuarios);
        this.usuarios = usuarios;
        this.cargando = false;
      }
    );
  }

  borrarUsuario(usuario: Usuario) {
    if (this._usuarioService.usuario._id === usuario._id) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Un usuario no se puede borrar a sí mismo',
      });
      return;
    }

    Swal.fire({
      title: '¿Estás seguro de eliminar al usuario ' + usuario.nombre + '?',
      text: 'No podrás revertir este cambio',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sí, estoy seguro'
    }).then((result) => {
      if (result.value) {
        this._usuarioService.borrarUsuario(usuario._id).subscribe(res => {
          this.cargarUsuarios();
          Swal.fire(
            'Borrado',
            'El usuario ' + usuario.nombre + ' ha sido borrado correctamente',
            'success'
          );
        });
      }
    });

  }
}
