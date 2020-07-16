import { BrowserModule } from '@angular/platform-browser';
import { CommonModule }from '@angular/common';
import { NgModule } from '@angular/core';



// Rutas
import { APP_ROUTES } from './app.routes';

// Modulos
import { PagesModule } from './pages/pages.module';
import { HttpClientModule } from '@angular/common/http';

// temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Componentes
import { AppComponent } from './app.component';

import { LoginBackendComponent } from './backend/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './backend/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ServiceModule } from './service/service.module';



@NgModule({
  declarations: [
    AppComponent,
    LoginBackendComponent,
    RegisterComponent
    ],
  imports: [
    BrowserModule,
    CommonModule,
    APP_ROUTES ,
    PagesModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule
     ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
