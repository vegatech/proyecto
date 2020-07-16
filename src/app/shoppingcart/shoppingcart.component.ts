import { Component, OnInit } from '@angular/core';
import { Catalogo } from '../model/Catalogo';
import { Router } from '@angular/router';
import { HttpClientService } from '../service/http-client.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {
  catalogos: Array<Catalogo>;
  catalogosRecieved: Array<Catalogo>;

  cartCatalogos: any;

  constructor(private router: Router, private httpClientService: HttpClientService) { }

  ngOnInit(): void {
    this.httpClientService.getCatalogs().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
     //from localstorage retrieve the cart item
     let data = localStorage.getItem('cart');
     //if this is not null convert it to JSON else initialize it as empty
     if (data !== null) {
       this.cartCatalogos = JSON.parse(data);
     } else {
       this.cartCatalogos = [];
     }
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
  addToCart(catalogoId) {
    //retrieve book from books array using the book id
    let catalogo = this.catalogos.find(catalogo => {
      return catalogo.id === +catalogoId;
    });
    let cartData = [];
    //retrieve cart data from localstorage
    let data = localStorage.getItem('cart');
    //prse it to json 
    if (data !== null) {
      cartData = JSON.parse(data);
    }
    // add the selected book to cart data
    cartData.push(catalogo);
    //updated the cartBooks
    this.updateCartData(cartData);
    //save the updated cart data in localstorage
    localStorage.setItem('cart', JSON.stringify(cartData));
    //make the isAdded field of the book added to cart as true
    catalogo.isAdded = true;
  }

  updateCartData(cartData) {
    this.cartCatalogos = cartData;
  }

  goToCart() {
    this.router.navigate(['/shop']);
  }

  emptyCart() {
    this.cartCatalogos = [];
    localStorage.clear();
  }

}
