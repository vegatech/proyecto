import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CartItem } from '../model/CartItem';
import { Order } from '../model/Order';
import { URL_SERVICIOS } from '../config/config';
import { HttpLoginService } from './http-login.service';

@Injectable({
  providedIn: 'root'
})
export class HttpOrderService {

  url = URL_SERVICIOS
  httpHeader: HttpHeaders = new HttpHeaders()

  cartCatalogos: CartItem[];

  constructor(
    private httpClient: HttpClient, private loginServices: HttpLoginService
  ) { }

  agregarToken(){
    let token =  this.loginServices.token
    
    if(token != null){
      
    console.log('Authorization','Bearer '+ token );
      return this.httpHeader.append('Authorization','Bearer '+ token )
    }
    return this.httpHeader
  }
  

  makePurchase(order: Order) {
    console.log(this.url + `/comprasPedidos/addNewOrder`);
    
    return this.httpClient.post(this.url + `/comprasPedidos/addNewOrder`, order, {headers: this.agregarToken()})
  }

}
