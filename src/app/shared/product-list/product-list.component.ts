import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatPaginatorModule, PageEvent} from '@angular/material/paginator'
import { SearchProduct } from 'src/app/core/models/product.search';
import { PagingResult } from 'src/app/core/models/paging-result';
import { Product } from 'src/app/core/models/product';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductComponent } from "../product/product.component";

@Component({
    selector: 'app-product-list',
    standalone: true,
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
    imports: [CommonModule, MatPaginatorModule, ProductComponent, NgFor]
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input() searchProduct!: SearchProduct;
  pagingResult: PagingResult<Product> = new PagingResult();
  
  constructor(private productService: ProductService){}


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['searchProduct']) {
      this.loadData();
    }
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.productService.getProducts(this.searchProduct)
    .subscribe({
      next: data => this.pagingResult = data,
      error: err => console.log(err)
    });
  }
  
  pageChange(event: PageEvent) {
    this.searchProduct.pageIndex = event.pageIndex,
    this.searchProduct.pageSize =event.pageSize
    this.loadData();
  }
}
