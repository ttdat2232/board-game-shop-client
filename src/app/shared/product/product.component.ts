import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations'
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { Product } from 'src/app/core/models/product';
import { Language } from 'src/app/core/models/ProductInformation';
import { ButtonComponent } from "../button/button.component";
import { AppUtils } from 'src/app/utils/app.utils';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    ButtonComponent,
  ],
  providers: [
    provideAnimations()
  ],
  animations: [
    AppUtils.simpleAnimation
  ]
})
export class ProductComponent implements OnInit, OnChanges {

  @Input() product!: Product;
  name!: string;
  image!: string;
  constructor(private lss: LocalStorageService) { }
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
    let cartString = localStorage.getItem("cart");
    let selectedProducts: Map<string, number> = new Map();
    let currentId = this.product.id;
    if (!cartString) {
      selectedProducts.set(currentId, 1);
    }
    else {
      selectedProducts = JSON.parse(cartString, AppUtils.mapReviver);
      let existed = selectedProducts.get(currentId);
      if (existed) {
        selectedProducts.set(currentId, existed + 1);
      } else {
        selectedProducts.set(currentId, 1);
      }
    }
    this.lss.setItem('cart', JSON.stringify(selectedProducts, AppUtils.mapReplacer));
  }
}
