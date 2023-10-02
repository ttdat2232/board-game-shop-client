import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations'

import { MatCardModule } from '@angular/material/card'
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/core/models/product';
import { Language, ProductInformation } from 'src/app/core/models/ProductInformation';
import { AppUtils } from 'src/app/utils/app.utils';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  providers: [
    provideAnimations()
  ],
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  animations: [
    AppUtils.simpleAnimation
  ]
})
export class CartItemComponent implements OnInit {

  @Input() product!: Product
  @Input() quantity!: number
  @Output() quantityChange: EventEmitter<number> = new EventEmitter();
  image: string = "";
  name: string = "";
  price: number = 0;

  ngOnInit(): void {
    this.loadData();
  }

  filterFunction(value: ProductInformation, index: number, array: ProductInformation[]) {
    return Language[value.language] == Language.Vietnamese.toString();
  }
  loadData() {
    this.image = this.product.thumbnailImage ?? this.product.images[0] ?? "";
    var existed = this.product.informations.filter(this.filterFunction)
    if(existed.length > 0) {
      this.name = existed[0].name;
    } else {
      this.name = this.product.informations[0].name;
    }
    this.price = this.product.price * this.quantity;
  }

  modifyProdcutQuantity(isPlus: boolean) {
    this.quantity = isPlus ? ++this.quantity : --this.quantity;
    this.price = this.quantity * this.product.price;
    this.quantityChange.emit(this.quantity);
  }
}