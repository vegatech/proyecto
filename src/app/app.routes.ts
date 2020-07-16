import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

import { LoginBackendComponent } from './backend/login.component';
import { RegisterComponent } from './backend/register.component';

const appRoutes: Routes = [

  { path: 'backend', component: LoginBackendComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NopagefoundComponent }
];



export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: false } );
