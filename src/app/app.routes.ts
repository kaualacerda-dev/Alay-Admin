import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { ProductRegistrationComponent } from './pages/product-registration/product-registration';
import { StockViewComponent } from './pages/stock-view/stock-view';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'cadastro-produtos', component: ProductRegistrationComponent },
    { path: 'estoque', component: StockViewComponent },
    { path: '**', redirectTo: 'login' },
];
