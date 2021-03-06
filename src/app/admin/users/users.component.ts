import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';
import { HttpClientService } from '../../service/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  usuarios: Array<Usuario>;
  selectedUser: Usuario;
  action: string;

  constructor(
    private httpClientService: HttpClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.refreshData();
  }
    refreshData() {
    this.httpClientService.getUsuarios().subscribe(
      response => this.handleSuccessfulResponse(response),
    );

    this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.action = params['action']
        const selectedUserId = params['id'];
        if (selectedUserId) {
          this.selectedUser = this.usuarios.find(usuario => usuario.id === +selectedUserId);
        }
      }
    );
  }

  handleSuccessfulResponse(response) {
    this.usuarios = response;
  }
  
  viewUser(id: number) {
    this.router.navigate(['admin','users'], {queryParams : {id, action: 'view'}});
  }

  addUser() {
    this.selectedUser = new Usuario();
    this.router.navigate(['admin', 'users'], { queryParams: { action: 'add' } });
  }
}
