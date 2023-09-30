import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstant } from '../../utils/app-constans';
import { SearchProduct } from '../models/product.search';
import { AppUtils } from '../../utils/app.utils';
import { Observable } from 'rxjs';
import { PagingResult } from '../models/paging-result';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productUrl: string = AppConstant.BASE_URL + "/api/product";
  constructor(private http: HttpClient ) { }
  
  getProducts(searchProduct?: SearchProduct): Observable<PagingResult<Product>> {
    var queriesUrl = AppUtils.generateQueriesUrl(this.productUrl, searchProduct);
    return this.http.get<PagingResult<Product>>(queriesUrl);
  }

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.productUrl}/${productId}`);
  }
}
