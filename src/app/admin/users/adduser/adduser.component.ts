import { Component, OnInit, EventEmitter,Input, Output } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';
import { HttpClientService } from '../../../service/http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css'],
  
})
export class AdduserComponent implements OnInit {

  @Input()
  usuario: Usuario
  
  
  @Output()
  usuarioAddedEvent = new EventEmitter();

  
  newUsuario: Usuario;
  message: string;
  password: string;

  constructor(private httpClientService: HttpClientService,
    private router: Router) { }

  ngOnInit(): void {
    this.newUsuario = Object.assign({}, this.usuario);
  }

  addUser() {
    this.httpClientService.addUser(this.usuario).subscribe(
      (usuario) => {
        this.usuarioAddedEvent.emit();
        this.router.navigate(['admin', 'users']);
      }
    );
  }

}
