import { BrowserModule } from '@angular/platform-browser';
import { CommonModule }from '@angular/common';
import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';


import { PagesComponent } from './pages.component';


// ng2-charts
import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AdduserComponent } from './admin/users/adduser/adduser.component';
import { ViewuserComponent } from './admin/users/viewuser/viewuser.component';
import { UsersComponent } from './admin/users/users.component';
import { CatalogsComponent } from './admin/catalogs/catalogs.component';
import { ViewcatalogComponent } from './admin/catalogs/viewcatalog/viewcatalog.component';
import { AddcatalogComponent } from './admin/catalogs/addcatalog/addcatalog.component';
import { ShoppingcartComponent } from '../shoppingcart/shoppingcart.component';
import { FormsModule } from '@angular/forms';






@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        UsersComponent,
        AdduserComponent,
        ViewuserComponent,
        CatalogsComponent,
        ViewcatalogComponent,
        AddcatalogComponent,
        ShoppingcartComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        UsersComponent,
        AdduserComponent,
        ViewuserComponent,
        CatalogsComponent,
        ViewcatalogComponent,
        AddcatalogComponent,
        ShoppingcartComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule
    ]
})
export class PagesModule { }
