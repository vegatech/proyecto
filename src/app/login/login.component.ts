import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpLoginService } from '../service/http-login.service';
import { NgForm } from '@angular/forms';
import { Usuario } from '../model/Usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = ''
  usuario = new Usuario()

  constructor(public _usuarioServices: HttpLoginService, public router: Router) { }

  ngOnInit() {
    this.email = localStorage.getItem('email') || ''
    if (this.email.length > 0) {
    }
  }

  login() {

    if (this.usuario.nombre == null || this.usuario.password == null) {
      console.log('Error: ' + this.usuario);
      return;
    }

    this._usuarioServices.loginUsuario(this.usuario)
      .subscribe(resp => this.router.navigate(['/checkout']))

  }


}
