// This data service provides methods to access public and protected resources. Because HttpOnly Cookies 
// sent along with HTTP requests (via the HttpInterceptor) automatically, we can just use HttpModule
// without caring about JWT.

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = 'http://localhost:8080/api/test';

@Injectable({
  providedIn: 'root'
})

// Service to access resources. Autherization is already provided in the get() through HttpClient
export class UserService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  // Public access
  getPublicContent(): Observable<any> {
    return this.http.get(this.baseApiUrl + 'all', { responseType: 'text' });
  }

  // User access
  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

}
