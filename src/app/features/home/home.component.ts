import { Component, OnInit } from '@angular/core';
import { SearchProduct } from 'src/app/core/models/product.search';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchProduct!: SearchProduct;
  ngOnInit(): void {
    this.searchProduct = new SearchProduct();
  }
}
