import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/core/models/product';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ProductService } from 'src/app/core/services/product.service';
import { AppUtils } from 'src/app/utils/app.utils';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  numberOfSelectedProducts!: number;
  productMap: Map<Product, number> = new Map();
  totalPrice: number = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private lss: LocalStorageService) { }

  ngOnInit(): void {
    this.lss.localStorage.subscribe({
      next: () => {
        let mapProductIdQuantity = AppUtils.getCart();
        this.numberOfSelectedProducts = mapProductIdQuantity.size;
        if (mapProductIdQuantity.size <= 0) {
          if (!this.router.url.includes('checkout'))
            this.router.navigate([''], {
              relativeTo: this.route,
            });
        }
      }
    })
    AppUtils.getCart().forEach((value: number, key: string, map: Map<string, number>) => {
      this.productService.getProductById(key)
        .subscribe({
          next: data => {
            this.productMap.set(data, value)
            this.totalPrice += data.price * value;
          },
          error: err => console.log(err)
        })
    });
  }

  getKeys() {
    let keys: Product[] = [];
    for (const [key, value] of this.productMap) {
      keys.push(key);
    }
    return keys;
  }

  changeQuantityOfProduct(key: Product, newQuantity: number) {
    let mapProductIdQuantity = AppUtils.getCart();
    let oldQuantity = mapProductIdQuantity.get(key.id);
    if (newQuantity <= 0) {
      this.productMap.delete(key);
      mapProductIdQuantity.delete(key.id);
      this.numberOfSelectedProducts = this.productMap.size;
    } else {
      this.productMap.set(key, newQuantity);
      mapProductIdQuantity.set(key.id, newQuantity);
    }
    let newPrice = oldQuantity && oldQuantity > 0 ? (newQuantity - oldQuantity) * key.price : 0;
    this.totalPrice += newPrice;
    this.lss.setItem('cart', JSON.stringify(mapProductIdQuantity, AppUtils.mapReplacer));
  }

  removeItem(key: Product) {
    let mapProductIdQuantity = AppUtils.getCart();
    let quantity = mapProductIdQuantity.get(key.id) ?? 0;
    this.totalPrice -= quantity * key.price;
    this.productMap.delete(key);
    mapProductIdQuantity.delete(key.id);
    this.numberOfSelectedProducts = this.productMap.size;
    this.lss.setItem('cart', JSON.stringify(mapProductIdQuantity, AppUtils.mapReplacer));
  }

  onCheckout() {
    this.router.navigate(['checkout'], {
      relativeTo: this.route
    })
  }



}
