/* The Error Interceptor intercepts http responses from the api to check if there
were any errors. If there a '401 Unauthorized' or '403 Forbidden' response, the
user is automatically logged out of the application. All other errors, are re-thrown
up to the calling service so an alert with the error can be displayed on the screen.

It is implemented using HttpInterceptor interface included in the HttpClientModule. 
By implementing the interface, you can create a custom interceptor to catch all error
responses from the server in a single location.

Http interceptors are added to the request pipeline in the providers section of the 
app.module.ts file.
*/

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { AccountService } from '../_services/account.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(catchError(err => {
        if ([401, 403].includes(err.status) && this.accountService.userValue) {
          // auto logout if 401 or 403 response returned from the api
          this.accountService.logout();
        }
        const error = err.error?.message || err.statusText;
        console.error(err);
        return throwError(() => error);
      }))
  }
}
