import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
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





const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'progress', component: ProgressComponent },
            { path: 'graficas1', component: Graficas1Component },
            { path: 'users', component: UsersComponent },
            { path: 'catalogs', component: CatalogsComponent },
            { path: 'shop', component: ShoppingcartComponent  }
           // { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
