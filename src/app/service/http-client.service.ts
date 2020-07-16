import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../model/Usuario';
import { Catalogo } from '../model/Catalogo';
import { URL_SERVICIOS } from '../config/config';
import { UsuarioDTO } from '../model/modelDTO/UsuarioDTO';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  url = URL_SERVICIOS;

  constructor(
    private httpClient: HttpClient
  ) { }


  getUsuarios() {
    return this.httpClient.get<Usuario[]>(this.url + '/usuarios/get');
  }

  addUser(newUser: Usuario) {
    return this.httpClient.post<Usuario>(this.url + '/usuarios/add', newUser);
  }

  deleteUser(id) {
    return this.httpClient.delete<Usuario>(this.url + '/usuarios/' + id);
  }

  getCatalogs() {
    return this.httpClient.get<Catalogo[]>(this.url + '/catalogos/get');
  }
  addCatalogs(newCatalog: Catalogo) {
    return this.httpClient.post<Catalogo>(this.url + '/catalogos/add', newCatalog);
  }
  deleteCatalogs(id) {
    return this.httpClient.delete<Catalogo>(this.url + '/catalogos/' + id);
  }
  updateCatalogs(updatedCatalogo: Catalogo) {
    return this.httpClient.put<Catalogo>(this.url + '/catalogos/update', updatedCatalogo);
  }

  getUsuarioLogueado(idUsuario: number) {
    return this.httpClient.get<UsuarioDTO>(this.url + `/personas/personaDto/${idUsuario}`)
  }


}

