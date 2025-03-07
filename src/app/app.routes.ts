import { Routes } from '@angular/router';
import { LoginComponent } from './+components/login/login.component';
import { ProductsComponent } from './+components/products/products.component';
import { BasketComponent } from './+components/basket/basket.component';
import { AdminPanelComponent } from './+components/admin-panel/admin-panel.component';

export const routes: Routes = [
    { path: 'products', component: ProductsComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: 'basket', component: BasketComponent, pathMatch: 'full' },
    { path: 'admin', component: AdminPanelComponent, pathMatch: 'full' },
    { path: '', redirectTo: 'products', pathMatch: 'full' }
];
