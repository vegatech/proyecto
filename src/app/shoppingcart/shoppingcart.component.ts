import { Component, OnInit } from '@angular/core';
import { Catalogo } from '../model/Catalogo';
import { Router } from '@angular/router';
import { HttpClientService } from '../service/http-client.service';
import Swal from 'sweetalert2'
import { HttpCartService } from '../service/http-cart.service';
import { CartItem } from '../model/CartItem';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {
  catalogos: Array<Catalogo>;
  catalogosRecieved: Array<Catalogo>;

  cartCatalogos: CartItem[];

  constructor(private router: Router, private httpClientService: HttpClientService, private cartService: HttpCartService) { }

  ngOnInit(): void {
    this.httpClientService.getCatalogs().subscribe(
      response => this.handleSuccessfulResponse(response),
    );

    this.cartCatalogos = this.cartService.cartListLocalStorage()

  }

  // we will be taking the books response returned from the database
  // and we will be adding the retrieved   
  handleSuccessfulResponse(response) {
    this.catalogos = new Array<Catalogo>();
    //get books returned by the api call
    this.catalogosRecieved = response;
    for (const catalogo of this.catalogosRecieved) {

      const catalogowithRetrievedImageField = new Catalogo();
      catalogowithRetrievedImageField.id = catalogo.id;
      catalogowithRetrievedImageField.idusuario = catalogo.idusuario;
      catalogowithRetrievedImageField.descripcion = catalogo.descripcion;
      catalogowithRetrievedImageField.detalle = catalogo.detalle;
      catalogowithRetrievedImageField.fechaIns = catalogo.fechaIns;
      //populate retrieved image field so that book image can be displayed
      catalogowithRetrievedImageField.img = catalogo.img;
      catalogowithRetrievedImageField.retrievedImage = 'data:image/jpeg;base64,' + catalogo.img;

      catalogowithRetrievedImageField.precio = catalogo.precio;
      catalogowithRetrievedImageField.estatus = catalogo.estatus;
      catalogowithRetrievedImageField.img = catalogo.img;
      this.catalogos.push(catalogowithRetrievedImageField);
    }
  }

  addToCart(cartItem: CartItem) {
    this.cartService.addToCart(cartItem)

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'El producto fue agregado',
      showConfirmButton: false,
      timer: 1500
    })
  }

  goToCart() {
    this.router.navigate(['/shop']);
  }

  addSomeToCart(cartItem:CartItem){
    this.addToCart(cartItem)
  }

}
