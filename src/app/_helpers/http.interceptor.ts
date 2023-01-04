// This is part of the implementation of storing a JSON Web Token (JWT) in a HttpOnly Cookie

// intercepts and handles a HttpRequest or HttpResponse
import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";

import { StorageService } from "../_services/storage.service";
import { AuthService } from "../_services/auth.service";

import { EventBusService } from "../_shared/event-bus.service";
import { EventData } from '../_shared/event.class'

// intercept() gets an HttpRequest object, changes it and forwards it to HttpHandler object's handle() method. It transforms the HttpRequest object into an Observable<HttpEvents>
// next: HttpHandler object, represents the next interceptor in the chain of interceptors. The final 'next' in the chain is the Angular HttpClient
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    private isRefreshing = false;

    constructor(
        private storageService: StorageService,
        private eventBusService: EventBusService,
        private authService: AuthService
    ) { }

    //intercep requests or responses before they are handled by intercept() method.
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            withCredentials: true,
        });

        //handle 401 error status on interceptor response (except response of /login request)
        return next.handle(req).pipe(
            catchError((error) => {
                if (
                    error instanceof HttpErrorResponse &&
                    !req.url.includes('api/Auth/login') &&
                    error.status === 401
                ) {
                    return this.handle401Error(req, next);
                }
                return throwError(() => error);
            })
        );
    }

    //emit 'logout' event if user is logged in
    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;

            if (this.storageService.isLoggedIn()) {
                return this.authService.refreshToken().pipe(
                    switchMap(() => {
                        this.isRefreshing = false;
                        return next.handle(request);
                    }),
                    catchError((error) => {
                        this.isRefreshing = false;

                        if (error.status == '403') {
                            this.eventBusService.emit(new EventData('logout', null));
                        }
                        return throwError(() => error);
                    })
                );

            }
        }
        return next.handle(request);
    }
}

export const HttpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];