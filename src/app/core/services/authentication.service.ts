import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstant } from 'src/app/utils/app-constans';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authenticationBaseUrl = AppConstant.BASE_URL + "/api/authentication"
  constructor(private http: HttpClient) { }

  loginFromGoogle(idToken: string): Observable<any> {
    return this.http.post<any>(this.authenticationBaseUrl + '/google', {idToken: idToken});
  }
}
