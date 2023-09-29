import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { Product } from 'src/app/core/models/product';
import { Language } from 'src/app/core/models/ProductInformation';
import { ButtonComponent } from "../button/button.component";

@Component({
    selector: 'app-product',
    standalone: true,
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    imports: [
        CommonModule,
        MatCardModule,
        ButtonComponent
    ]
})
export class ProductComponent implements OnInit, OnChanges {

  @Input() product!: Product;
  name!: string;
  image!: string;
  ngOnInit(): void {
    this.image = this.product.thumbnailImage ?? this.product.images[0];
    this.product.informations.forEach(infor => {
      if (infor.language.valueOf() === Language.Vietnamese) {
        this.name = infor.name;
      }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']) {
      this.product = changes['product'].currentValue;
      this.image = this.product.thumbnailImage ?? this.product.images[0];
      this.product.informations.forEach(infor => {
        if (infor.language.valueOf() === Language.Vietnamese) {
          this.name = infor.name;
        }
      });
    }
  }

  onAddToCart(event: boolean) {
    console.log(event);
  }
}
