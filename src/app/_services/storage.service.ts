// Manages user information (username, email, roles) inside the browser's Session Storage. This is cleared when logging out

import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  constructor() { }

  // Deletes the session storage
  clean(): void {
    window.sessionStorage.clear();
  }

  // Converts the user key into a json string
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));    // JSON.stringify() converts a JS value to a JSON string.
  }

  // Converts the user key into a JS value
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);  // JSON.parse converts a JSON string into a JS value
    }

    return {};
  }

  // Check if the user is logged in
  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    
    return false;
  }
}
