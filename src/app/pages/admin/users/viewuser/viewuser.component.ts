import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';
import { HttpClientService } from 'src/app/service/http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewuserComponent implements OnInit {

  @Input()
  usuario: Usuario


  @Output()
  usuarioDeletedEvent = new EventEmitter();

  constructor(private httpClientService: HttpClientService,
    private router: Router) { }

  ngOnInit(): void {
  }

  
  deleteUser() {
    this.httpClientService.deleteUser(this.usuario.id).subscribe(
      (usuario) => {
        this.usuarioDeletedEvent.emit();
        this.router.navigate(['admin', 'users']);
      }
    );
  }

}
