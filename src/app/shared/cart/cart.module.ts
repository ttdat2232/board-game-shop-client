import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { CartItemComponent } from "./cart-item/cart-item.component";
import { ButtonComponent } from "../button/button.component";


@NgModule({
    declarations: [
        CartComponent
    ],
    imports: [
        SpinnerComponent,
        CommonModule,
        CartRoutingModule,
        CartItemComponent,
        ButtonComponent
    ]
})
export class CartModule { }
