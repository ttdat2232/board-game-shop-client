import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'home',
        loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'cart',
        loadChildren: () => import('./shared/cart/cart.module').then(m => m.CartModule)
    },
    { path: 'authenticate', loadChildren: () => import('./features/authenticate/authenticate.module').then(m => m.AuthenticateModule) },
    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
