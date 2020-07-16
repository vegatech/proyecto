import { Component, OnInit } from '@angular/core';
import { CartItem } from '../model/CartItem';
import { HttpCartService } from '../service/http-cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from '../model/Persona';
import { HttpClientService } from '../service/http-client.service';
import { UsuarioDTO } from '../model/modelDTO/UsuarioDTO';
import { Usuario } from '../model/Usuario';
import { Order } from '../model/Order';
import { OrderDetalle } from '../model/OrderDetalle';
import { HttpOrderService } from '../service/http-order.service';

@Component({
  selector: 'app-shoppingcartcheck',
  templateUrl: './shoppingcartcheck.component.html',
  styleUrls: ['./shoppingcartcheck.component.css']
})
export class ShoppingcartcheckComponent implements OnInit {

  cartCatalogos: CartItem[]
  totalCart = 0.00
  idUsuario: number
  persona: Persona

  public formGroup: FormGroup

  constructor(public cartService: HttpCartService, private formBuilder: FormBuilder, private clienteService: HttpClientService, private orderServices: HttpOrderService) 
  { }

  ngOnInit(): void {
    this.buildForm()
    this.getUsuarioLogueado()
    this.getCatalogosCompra()
  }

  private getUsuarioLogueado(){
    this.idUsuario = parseInt(localStorage.getItem('idUser')) 
    
     this.clienteService.getUsuarioLogueado(this.idUsuario).subscribe(res => {
      this.llenarDatos(res)
    });
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],  
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() {
    return this.formGroup.controls;
  }

  llenarDatos(user: UsuarioDTO){
    this.f.nombres.setValue(user.persona.nombre)
    this.f.apellidos.setValue(user.persona.apellido)
    this.f.direccion.setValue(user.persona.direccion)
    this.f.telefono.setValue(user.persona.telefono)
    this.f.email.setValue(user.usuario.email)

    this.idUsuario = user.usuario.id
  }

  submit() {
    if (this.formGroup.valid) {
      let orden = new Order()
      orden.detalles = []
      let detalles = this.cartService.getListCart()
      
       detalles.forEach(element => {
        let ordenDetalle = new OrderDetalle
        ordenDetalle.cantidad = element.cantidad
        ordenDetalle.idCatalogo = element.catalogo.id
        ordenDetalle.montoTotal = element.cantidad * element.catalogo.precio
        ordenDetalle.montoUnitario = element.catalogo.precio
        orden.detalles.push(ordenDetalle)
      });

      orden.idComprador = this.idUsuario

      this.orderServices.makePurchase(orden).subscribe(
        ()=>{console.log("Respesurta");
        }
      )

      console.log(JSON.stringify(orden))
    }
    else{
      alert("FILL ALL FIELDS")
    }
  }

  getCatalogosCompra(){
    this.cartCatalogos = this.cartService.getListCart()
   
    this.totalCart = 0.00

    this.cartCatalogos.forEach(element => {
     let subtotalItem = element.cantidad * element.catalogo.precio

      this.totalCart += subtotalItem
    });
  }

  limpiarCarrito(){
    localStorage.removeItem('cart');
  }

}
