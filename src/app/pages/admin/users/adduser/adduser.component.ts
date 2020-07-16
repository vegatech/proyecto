import { Component, OnInit, EventEmitter,Input, Output } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioDTO } from 'src/app/model/UsuarioDTO';
import { HttpClientService } from 'src/app/service/http-client.service';
import { Router } from '@angular/router';
import { Persona } from 'src/app/model/Persona';
import { Perfil } from 'src/app/model/Perfil';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css'],
  
})
export class AdduserComponent implements OnInit {

  @Input()
  usuario: Usuario;
  @Input()
  persona: Persona;

  perfil: Perfil;

  usuarioDTO: UsuarioDTO;
  
  
  @Output()
  usuarioAddedEvent = new EventEmitter();

  
  newUsuario: Usuario;
  newPersona: Persona;
 
  perfiles: Array<Perfil>;
 
  message: string;
  password: string;

  constructor(private httpClientService: HttpClientService,
    private router: Router) { }

  ngOnInit(): void {
    this.newUsuario = Object.assign({}, this.usuario);
    this.newPersona = Object.assign({}, this.persona);
    this.refreshData();
  }
  refreshData() {
    this.httpClientService.getProfiles().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
    }
  addUser() {
    this.httpClientService.addUser(this.usuario, this.persona).subscribe(
      (usuario) => {
        this.usuarioAddedEvent.emit();
        this.router.navigate(['admin', 'users']);
      }
    );
  }
  handleSuccessfulResponse(response) {
    this.perfiles = response;
  }
}
