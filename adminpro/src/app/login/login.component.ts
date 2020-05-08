import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
// Declaramos libreria gapi
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  auth2;

  constructor(public router: Router, public _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    init_plugins();
    this.googleInit();
    
    this.email = localStorage.getItem('email') || '';
    this.recuerdame = localStorage.getItem('email') && localStorage.getItem('email').length > 0;
  }

  /**
   * Fuente: https://developers.google.com/identity/sign-in/web/listeners
   */
  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '790875260017-8rf3qmuq0r4t6loe751a3tg82vjholmi.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignIn(document.getElementById('btnGoogle'));
    });
  }


  attachSignIn(elementHtml) {
    this.auth2.attachClickHandler(elementHtml, {}, googleUser => {
      const profile = googleUser.getBasicProfile();
      console.log(profile);
    });
  }


  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }
    const usuario = new Usuario('adi', forma.value.email, forma.value.password);
    this._usuarioService.login(usuario, forma.value.recuerdame).subscribe(
      res => {
        this.router.navigate(['/dashboard']);
      }
    );
  }
}
