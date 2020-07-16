import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Catalogo } from 'src/app/model/Catalogo';
import { CartItem } from 'src/app/model/CartItem';

@Component({
  selector: 'app-contador',
  templateUrl: './contador.component.html',
  styleUrls: ['./contador.component.css']
})
export class ContadorComponent implements OnInit {

  @Input()
  catalogo: Catalogo
  
  @Input()
  cantidadItems: number

  @Input()
  addBotoom: Boolean

  @Output()
  addToCartConteo = new EventEmitter<CartItem>();

  cantidad = 1

  cartItemAdd: CartItem

  constructor() { }

  ngOnInit(): void {
  }

  addItem() {
    this.cantidad += 1
  }

  subtractItem() {
    if (this.cantidad == 1) {
      return
    }
    this.cantidad -= 1
  }

  onAddToCart() {
    this.cartItemAdd = new CartItem
    this.cartItemAdd.catalogo = this.catalogo
    this.cartItemAdd.cantidad = this.cantidad
    
    this.addToCartConteo.emit(
      this.cartItemAdd
    );

    this.cantidad = 1

  }

  addItemUpdate() {
    this.cantidadItems ++
    this.onUpdateToCart()
  }

  subtractItemUpdate() {
    if (this.cantidadItems == 1) {
      return
    }
    this.cantidadItems --
    this.onUpdateToCart()
  }

  onUpdateToCart() {
    
    this.cartItemAdd = new CartItem
    this.cartItemAdd.catalogo = this.catalogo
    this.cartItemAdd.cantidad = this.cantidadItems
    
    this.addToCartConteo.emit(
      this.cartItemAdd
    );

  }


}
