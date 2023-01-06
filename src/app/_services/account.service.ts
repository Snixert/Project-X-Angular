/* The account service handles communication between the app and the backend api
for everything related to accounts. it contains methods for the login, logout and
registration, as well as standard CRUD methods for retrieving, modifying and
deleting user data.

On successful login, the returned 'user' is stored in browser local storage to keep
the user logged in between page refreshes and browser sessions. If you prefer not 
to use local storate it can be removed from the service, or it can be replaced by
session storage

The 'user' property exposes an RxJS observable (Observable<User>) so any component
can subscribe to be notified when a user logs in, logs out or updates their profile.
The notification is triggered by the call to 'this.userSubject.next() from each of
those methods. For more info check this: 
https://jasonwatmore.com/post/2022/11/17/angular-14-communicating-between-components-with-rxjs-observable-subject

The 'userValue' getter allows other components to easily get the current value of the
logged in user without having to subscribe to the 'user' observable.
*/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<User>(environment.baseApiUrl + '/users/login', { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  register(user: User) {
    return this.http.post(environment.baseApiUrl + '/users/register', user);
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  // CRUD
  getAll() {
    return this.http.get<User[]>(environment.baseApiUrl + '/users');
  }

  getById(id: string) {
    return this.http.get<User>(environment.baseApiUrl + '/users/' + { id });
  }

  update(id: string, params: any) {
    return this.http.put(environment.baseApiUrl + '/users/' + { id }, params)
      .pipe(map(x => {
        // update stored user if the logged in user updated their own record
        if (id == this.userValue?.id) {
          // update localStorage
          const user = { ...this.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));

          // publish updated user to subscribers
          this.userSubject.next(user);
        }
        return x;
      }));
  }

  delete(id: string) {
    return this.http.delete(environment.baseApiUrl + '/users/' + { id })
      .pipe(map(x => {
        // auto logout if the logged in user deleted their own record
        if (id == this.userValue?.id) {
          this.logout();
        }
        return x;
      }))
  }
}

