import { Component, OnInit } from '@angular/core';
import { HttpCartService } from 'src/app/service/http-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public cartService: HttpCartService) {
  }

  ngOnInit(): void {
  }

  cerrarSesion(){
    localStorage.clear()
  }

}
