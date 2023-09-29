import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ButtonComponent } from "../../shared/button/button.component";
import { ProductListComponent } from "../../shared/product-list/product-list.component";


@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        ButtonComponent,
        ProductListComponent
    ]
})
export class HomeModule { }
