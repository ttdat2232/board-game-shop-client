import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { District, Division } from '../models/address.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  baseUrl: string = "https://provinces.open-api.vn/api/"
  // baseUrl: string = "https://provinces.open-api.vn/api/p/79?depth=3"
  constructor(private http: HttpClient) { }

  getAllDivisions(): Observable<Division[]> {
    return this.http.get<Division[]>(this.baseUrl);
  }

  getDivisionById(id: number) {
    return this.http.get<Division>(`${this.baseUrl}p/${id}?depth=2`);
  }

  getDistrictById(id: number) {
    return this.http.get<District>(`${this.baseUrl}d/${id}?depth=2`);
  }
}
