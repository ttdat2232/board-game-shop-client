import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstant } from 'src/app/utils/app-constans';
import { PagingResult } from '../models/paging-result';
import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryApiUrl = AppConstant.BASE_URL + "/api/category"
  constructor(private http: HttpClient) { }

  getCategories(): Observable<PagingResult<Category>> {
    return this.http.get<PagingResult<Category>>(this.categoryApiUrl);
  }
}
