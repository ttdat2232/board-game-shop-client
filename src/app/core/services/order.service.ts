import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstant } from 'src/app/utils/app-constans';
import { AppUtils } from 'src/app/utils/app.utils';
import { CreateOrder } from '../models/create-order.model';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderApiUrl = AppConstant.BASE_URL + "/api/order";

  constructor(private http: HttpClient) { }

  createOrder(order: CreateOrder): Observable<Order> {
    return this.http.post<Order>(this.orderApiUrl, order);
  }
}
