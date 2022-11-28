// This service sends registration, login, logout HTTP POST requests to back-end

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/*
Reactive programming is an asynchronous programming paradigm concerned with data streams and the propagation of change (Wikipedia).
RxJS (Reactive Extensions for JavaScript) is a library for reactive programming using observables that makes it easier to compose 
asynchronous or callback-based code.
*/

const AUTH_API = 'http://localhost:8080/api/auth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})     // HttpHeaders represents the header config options for an HTTP request. Modifying methods return a cloned instance with the change. The original object is never changed.
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) : Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string) : Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
      },
      httpOptions
    )
  }

  logout(): Observable<any> {
    return this.http.post(
      AUTH_API + 'signout', {},
      httpOptions
    );
  }
}
