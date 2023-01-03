// This is part of the implementation of storing a JSON Web Token (JWT) in a HttpOnly Cookie

// intercepts and handles a HttpRequest or HttpResponse
import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs";

// intercept() gets an HttpRequest object, changes it and forwards it to HttpHandler object's handle() method. It transforms the HttpRequest object into an Observable<HttpEvents>
// next: HttpHandler object, represents the next interceptor in the chain of interceptors. The final 'next' in the chain is the Angular HttpClient
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            withCredentials: true,
        });

        return next.handle(req);
    }
}

export const HttpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];