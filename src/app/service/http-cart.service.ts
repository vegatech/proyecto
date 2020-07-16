import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../model/CartItem';

@Injectable({
  providedIn: 'root'
})
export class HttpCartService {

  cartCatalogos: CartItem[];

  constructor(
    private httpClient: HttpClient
  ) { }

  addToCart(catalogo: CartItem) {
    let isAdd = true
    let cartData = []
    //retrieve cart data from localstorage
    let data = localStorage.getItem('cart');
    //prse it to json 
    if (data !== null) {
      cartData = JSON.parse(data);
    }
    cartData.forEach(element => {
      if (element.catalogo.id === catalogo.catalogo.id) {
        element.cantidad += catalogo.cantidad
        isAdd = false
      }
    });

    if (isAdd) {
      // add the selected book to cart data
      cartData.push(catalogo)
    }
    //updated the cartBooks
    this.updateCartData(cartData);
    //save the updated cart data in localstorage
    localStorage.setItem('cart', JSON.stringify(cartData));

  }

  updateToCart(catalogo: CartItem) {
    let cartData = []
    //retrieve cart data from localstorage
    let data = localStorage.getItem('cart');
    //prse it to json 
    if (data !== null) {
      cartData = JSON.parse(data);
    }
    cartData.forEach(element => {
      if (element.catalogo.id === catalogo.catalogo.id) {
        element.cantidad = catalogo.cantidad
      }
    });
    //updated the cartBooks
    this.updateCartData(cartData);
    //save the updated cart data in localstorage
    localStorage.setItem('cart', JSON.stringify(cartData));

  }

  updateCartData(cartData) {
    this.cartCatalogos = cartData;
  }

  cartListLocalStorage() {
    //from localstorage retrieve the cart item
    let data = localStorage.getItem('cart');
    //if this is not null convert it to JSON else initialize it as empty
    if (data !== null) {
      return this.cartCatalogos = JSON.parse(data);
    } else {
      return this.cartCatalogos = [];
    }
  }

  getCartData() {
    return JSON.parse(localStorage.getItem('cart'))
  }

  getListCart() {
    this.cartCatalogos = this.getCartData()
    if (this.cartCatalogos !== null) {
      return this.cartCatalogos
    } else {
      return this.cartCatalogos = [];
    }
  }

  calcularTotalCarrito() {
    let cartTotal = 0
    let cartCatalogos = this.getCartData()
    if (cartCatalogos != null && cartCatalogos.length > 0) {
      cartCatalogos.forEach((element: any) => {
        cartTotal += element.catalogo.precio
      });
    }
    return cartTotal
  }


  deleteItem(index: number) {
    if (index !== -1) {
      this.cartCatalogos.splice(index, 1);
      this.updateLocalStorage()
    }
  }

  updateLocalStorage() {
    let cartData = [];
    //retrieve cart data from localstorage
    let data = localStorage.getItem('cart');
    //prse it to json 
    if (data !== null) {
      cartData = JSON.parse(data);
    }
    cartData = this.cartCatalogos
    localStorage.removeItem('cart')
    //save the updated cart data in localstorage
    localStorage.setItem('cart', JSON.stringify(cartData));
  }

  emptyCart() {
    this.cartCatalogos = [];
    localStorage.clear();
  }

}
