import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { UsersComponent } from './admin/users/users.component';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { AdduserComponent } from './admin/users/adduser/adduser.component';
import { ViewuserComponent } from './admin/users/viewuser/viewuser.component';
import { CatalogsComponent } from './admin/catalogs/catalogs.component';
import { AddcatalogComponent } from './admin/catalogs/addcatalog/addcatalog.component';
import { ViewcatalogComponent } from './admin/catalogos/viewcatalog/viewcatalog.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './shared/header/header.component';
import { HttpCartService } from './service/http-cart.service';
import { ShoppingcartpageComponent } from './shoppingcartpage/shoppingcartpage.component';
import { ShoppingcartcheckComponent } from './shoppingcartcheck/shoppingcartcheck.component';
import { ContadorComponent } from './utils/contador/contador.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    UsersComponent,
    AdduserComponent,
    ViewuserComponent,
    CatalogsComponent,
    AddcatalogComponent,
    ViewcatalogComponent,
    ShoppingcartComponent,
    LoginComponent,
    HeaderComponent,
    ShoppingcartpageComponent,
    ShoppingcartcheckComponent,
    ContadorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [HttpCartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
