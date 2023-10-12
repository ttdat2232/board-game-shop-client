import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstant } from 'src/app/utils/app-constans';

@Injectable({
  providedIn: 'root'
})
export class ServerConstantService {
  private serverConfigBaseUrl = AppConstant.BASE_URL + "api/AppsConfigurations";
  constructor(private http: HttpClient) { }

  public getClientId(): Observable<string> {
    return this.http.get<string>(this.serverConfigBaseUrl + '/google-client');
  }
}
