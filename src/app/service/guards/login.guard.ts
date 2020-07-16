import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpLoginService } from '../http-login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(public _usuarioService: HttpLoginService, public router: Router) { };

  canActivate() {

    if (this._usuarioService.estaLogueado()) {
      return true;

    } else {
      this.router.navigate(['/login']);
      return false;

    }

  }
  
}
