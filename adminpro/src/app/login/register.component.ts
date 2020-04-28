import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor() { }

  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }

      return {
        sonIguales: true
      };
    };
  }

  ngOnInit(): void {
    init_plugins();
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(true),
    },
    {
      validators: this.sonIguales('password', 'password2')
    });

    this.forma.setValue({
      nombre: 'Test',
      correo: 'test@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });
  }

  registrarUsuario() {
    if (this.forma.valid) {
      return;
    }
    if (!this.forma.value.condiciones) {
      console.log('Debe de aceptar las condiciones');
      return;
    }
    console.log("Forma Válida", this.forma.valid);
    console.log(this.forma.value);
  }

}
