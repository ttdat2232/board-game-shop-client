import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav'
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ButtonComponent } from "../../shared/button/button.component";
import { ProductListComponent } from "../../shared/product-list/product-list.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        CommonModule,
        MatSidenavModule,
        HomeRoutingModule,
        ButtonComponent,
        ProductListComponent,
        SidebarComponent
    ]
})
export class HomeModule { }
