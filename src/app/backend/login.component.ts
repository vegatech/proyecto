import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpLoginService } from '../service/http-login.service';


import { Usuario } from '../model/Usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginBackendComponent implements OnInit {
  
  usuarioStorage = ''
  usuario = new Usuario()

  constructor(
    public _usuarioServices: HttpLoginService, public router: Router
  ) { }

  ngOnInit() {
    this.usuarioStorage = localStorage.getItem('usuario') || ''
    if (this.usuarioStorage.length > 0) {
    }
  }


  login() {

    if (this.usuario.usuario == null || this.usuario.password == null) {
      console.log('Error: ' + this.usuario);
      return;
    }

      this._usuarioServices.loginUsuario(this.usuario)
        .subscribe(resp => this.router.navigate(['/dashboard']))

  }

}
