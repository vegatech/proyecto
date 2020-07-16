import { Component, OnInit } from '@angular/core';
import { Menu } from '../../model/Menu';
import { HttpClientService } from '../../service/http-client.service';
import { HttpLoginService } from '../../service/http-login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginBackendComponent } from '../../backend/login.component';
import { Usuario } from '../../model/Usuario';
import { UsuarioDTO } from '../../model/UsuarioDTO';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { stringify } from 'querystring';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  menus: Array<Menu>;
  usuarios: Usuario;
  usuario: string;
  idUsuario: number;
  idProfile: number;
  reemplazar: string;
  public formGroup: FormGroup

  constructor(
    private HttpLoginService: HttpLoginService,
    private clienteService: HttpClientService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.buildForm();
    this.getUsuarioLogueado();
    
  }

  private getUsuarioLogueado(){
    
    this.usuario = localStorage.getItem('usuario');
    this.reemplazar =this.usuario.replace(/"/gi,'');
    console.log(this.reemplazar);
     this.clienteService.getUsuarioLogueadoBK(this.reemplazar).subscribe(res => {
      this.llenarDatos(res)
    });
  }
  private buildForm() {
    this.formGroup = this.formBuilder.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }
  get f() {
    return this.formGroup.controls;
  }
  llenarDatos(user: UsuarioDTO){

    console.log("Id Perfil: "+user.usuario.idPerfil);  
    this.idUsuario = user.usuario.id
  
    this.refreshData(user.usuario.idPerfil);
  }
  refreshData(id: number) {
    this.HttpLoginService.cargarStorage();
    this.clienteService.getMenu(id).subscribe(
      response => this.handleSuccessfulResponse(response),
    );
  }

  handleSuccessfulResponse(response) {
    this.menus = response;
  }

 }

