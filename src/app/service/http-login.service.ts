import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../model/Usuario';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { URL_SERVICIOS } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class HttpLoginService {

  url = URL_SERVICIOS;
  usuario: Usuario;
  token: string;

  constructor(
    private _http: HttpClient
  ) {
    this.cargarStorage();
  }

    //loguear()
    loginUsuario(usuario: Usuario): Observable<any> {

      const credenciales = btoa('angularapp' + ':' + '12345');

      const httpHeaders = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + credenciales
      });

      let params = new URLSearchParams();
      params.set('grant_type', 'password');
      params.set('username', usuario.nombre);
      params.set('password', usuario.password);
      console.log('Elementos: ' + params.toString());

      
      return this._http.post<any>(
        this.url + '/oauth/token', params.toString(), { headers: httpHeaders })
        .pipe(map((resp: any) => { 
          console.log("Guardando Respuesta: " + resp.nombre);
           
          this.guardarStorage(resp.access_token, resp.nombre, resp.idUser);
        }))
    }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(token: string, usuario: Usuario, idUser: number) {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('idUser', JSON.stringify(idUser));
    this.usuario = usuario;
    this.token = token;
  }

  estaLogueado() {
    return (this.token.length > 8) ? true : false;
  }

}
