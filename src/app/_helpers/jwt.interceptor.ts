/* The JWT Interceptor intercepts http requests from the app to add a JWT
auth token to the Authorization header if the user is logged in and the 
request is to the application api url (environment.baseApiUrl).

It is implemented using the HttpInterceptor interface included in the 
HttpClientModule. By implementing the interface, you can create a custom
interceptor to modify http requests before they get sent to the server.

Http interceptors are added to the request pipeline in the providers
section of the app.module.ts file.
*/
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and the request is to the api url
    const user = this.accountService.userValue;
    const isLoggedIn = user && user.token;
    const isApiUrl = request.url.startsWith(environment.baseApiUrl);

    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer + ${user.token}` }
      });
    }
    return next.handle(request);
  }
}
