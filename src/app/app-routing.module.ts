import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './admin/users/users.component';
import { CatalogsComponent } from './admin/catalogs/catalogs.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { LoginComponent } from './login/login.component';
import { ShoppingcartpageComponent } from './shoppingcartpage/shoppingcartpage.component';
import { ShoppingcartcheckComponent } from './shoppingcartcheck/shoppingcartcheck.component';
import { LoginGuard } from './service/guards/login.guard';

const routes: Routes = [
    { path: '', component: ShoppingcartComponent },
    { path: 'admin/users', component: UsersComponent },
    { path: 'admin/catalogs', component: CatalogsComponent },
    { path: 'shop', component: ShoppingcartComponent },
    { path: 'cart', component: ShoppingcartpageComponent },
    { path: 'checkout', component: ShoppingcartcheckComponent, canActivate: [LoginGuard]},
    { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
