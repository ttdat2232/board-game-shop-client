import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { CreateOrderDetails } from 'src/app/core/models/create-order-details.model';
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
  orderDetails: CreateOrderDetails[] = [];
  productMap: Map<Product, number> = new Map();
  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router, private lss: LocalStorageService) { }
  ngOnInit(): void {
    this.lss.localStorage.subscribe({
      next: () => {
        let cartString = localStorage.getItem("cart");
        let mapProductIdQuantity: Map<string, number> = new Map();
        if (cartString) {
          mapProductIdQuantity = JSON.parse(cartString, AppUtils.mapReviver);
          if(mapProductIdQuantity.size <= 0) {
            this.router.navigate(['/home'], {
              relativeTo: this.route,
            });
          }
        } else {
          this.router.navigate(['/home'], {
            relativeTo: this.route,
          });
        }
      }
    })
    this.loadProducts();
    this.orderDetails.forEach(detail => {
      this.productService.getProductById(detail.productId)
        .subscribe({
          next: data => {
            this.productMap.set(data, detail.quentity)
          },
          error: err => console.log(err)
        })
    })
  }

  loadProducts() {
    let cartString = localStorage.getItem("cart");
    let mapProductIdQuantity: Map<string, number> = new Map();
    if (!cartString) {
      this.router.navigate(['home'], {
        relativeTo: this.route,
      });
      return;
    }
    mapProductIdQuantity = JSON.parse(cartString, AppUtils.mapReviver);
    this.numberOfSelectedProducts = mapProductIdQuantity.size;
    for (const [key, value] of mapProductIdQuantity.entries()) {
      this.orderDetails.push(new CreateOrderDetails(key, value));
    }
  }

  getKeys() {
    let keys: Product[] = [];
    for (const [key, value] of this.productMap) {
      keys.push(key);
    }
    return keys;
  }

  changeQuantityOfProduct(key: Product, event: number) {
    let cartString = localStorage.getItem("cart");
    let mapProductIdQuantity: Map<string, number> = new Map();
    if (cartString)
      mapProductIdQuantity = JSON.parse(cartString, AppUtils.mapReviver);
    if (event <= 0) {
      this.productMap.delete(key);
      mapProductIdQuantity.delete(key.id);
    } else {
      this.productMap.set(key, event);
      mapProductIdQuantity.set(key.id, event);
    }
    this.lss.setItem('cart', JSON.stringify(mapProductIdQuantity, AppUtils.mapReplacer));
  }
}
