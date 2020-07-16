import { Component, OnInit } from '@angular/core';
import { Catalogo } from '../model/Catalogo';
import { CartItem } from '../model/CartItem';
import { HttpCartService } from '../service/http-cart.service';
import { HttpClientService } from '../service/http-client.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-shoppingcartpage',
  templateUrl: './shoppingcartpage.component.html',
  styleUrls: ['./shoppingcartpage.component.css']
})
export class ShoppingcartpageComponent implements OnInit {

  catalogos: Array<Catalogo>;
  catalogosRecieved: Array<Catalogo>;

  cartCatalogos: CartItem[];

  totalCart = 0.00

  constructor( public cartService: HttpCartService) { }

  ngOnInit(): void {
    this.getCatalogosCompra()
  }

  addSomeToCart(cartItem: CartItem) {    
    this.addToCart(cartItem)
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

  getCatalogosCompra(){
    this.cartCatalogos = this.cartService.getListCart()
   
    this.totalCart = 0.00

    this.cartCatalogos.forEach(element => {
     let subtotalItem = element.cantidad * element.catalogo.precio

      this.totalCart += subtotalItem
    });
  }

  updateSomeToCart(cartItem: CartItem){
    this.cartService.updateToCart(cartItem)

    this.ngOnInit()
  }

  deleteItem(index){
    this.cartService.deleteItem(index)
    this.ngOnInit()
  }

}
