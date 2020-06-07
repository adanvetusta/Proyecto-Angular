import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../service.index';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService, public router: Router) {

  }

  canActivate(): Promise<boolean> | boolean  {
    console.log('inicio del verifica token guard');
    const token = this._usuarioService.token;
    // Contenido del token
    const payload = JSON.parse(atob(token.split('.')[1]));
    // Fecha de expiración: exp
    const expirado = this.expirado(payload.exp);
    if (expirado) {
      this.router.navigate(['/login']);
      return false;
    }
    return this.verificaRenueva(payload.exp);
  }

  verificaRenueva(fechaExp: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const tokenExp = new Date(fechaExp * 1000);
      const ahora = new Date();

      // 4 horas a milisegundos
      ahora.setTime(ahora.getTime() + (4 * 3600000));

      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        // Si sucede algún error, segunda función del subscribe. Si todo va bien, la primera
        this._usuarioService.renuevaToken().subscribe( () => {
          resolve(true);
        }, () => {
          reject(false);
          this.router.navigate(['/login']);
        }
        );
      }
    });
  }

  expirado(fechaExp: number) {
    // Dividimos entre mil para pasar de milisegundos a segundos
    const ahora = new Date().getTime() / 1000;
    if (fechaExp < ahora) {
      // Ha expirado
      return true;
    }
    return false;
  }
}
