import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;

  constructor(public router: Router, public _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    init_plugins();
  }


  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }
    const usuario = new Usuario('adi', forma.value.email, forma.value.password);
    this._usuarioService.login(usuario, forma.value.recuerdame).subscribe(
      res => {
        console.log(res);
      }
    );
  }
}
