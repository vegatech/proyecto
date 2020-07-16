import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../model/Usuario';
import { Persona } from '../model/Persona';
import { Catalogo } from '../model/Catalogo';
import { UsuarioDTO } from '../model/UsuarioDTO';
import { Perfil } from '../model/Perfil';
import { URL_SERVICIOS } from '../config/config';
import { Menu } from '../model/Menu';


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {


  url =URL_SERVICIOS

  constructor(
    private httpClient:HttpClient
    ) { }

  
  getUsuarios()
  {
    return this.httpClient.get<Usuario[]>(this.url+'/usuarios/get');
  }

  addUser(newUser: Usuario, newPersona: Persona) {
    return this.httpClient.post<Usuario>(this.url+'/usuarios/add', newUser);
  }
  getUsuarioLogueadoBK(Usuario: string) {
    return this.httpClient.get<UsuarioDTO>(this.url + `/personas/personaDtos/${Usuario}`)
  }
  getProfiles() {
    return this.httpClient.get<Perfil[]>(this.url+'/perfiles/get');
  }
  getMenu(id){
    return this.httpClient.get<Menu[]>(this.url+'/menu/get/'+id);
  }
  deleteUser(id) {
    return this.httpClient.delete<Usuario>(this.url+'/usuarios/' + id);
  }

  getCatalogs() {
    return this.httpClient.get<Catalogo[]>(this.url+'/catalogos/get');
  }
  addCatalogs(newCatalog: Catalogo) {
    return this.httpClient.post<Catalogo>(this.url+'/catalogos/add', newCatalog);
  }
  deleteCatalogs(id) {
    return this.httpClient.delete<Catalogo>(this.url+'/catalogos/' + id);
  }
  updateCatalogs(updatedCatalogo: Catalogo) {
    return this.httpClient.put<Catalogo>(this.url+'/catalogos/update', updatedCatalogo);
  }
}
