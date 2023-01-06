/* Auth Guard is an angular route guard that is used to prevent unauthenticated users
from accessing restricted routes. It does this by implementing the CanActivate interface
which allows the guard to decide if a route can be activated with the canActivate()
method. If the method returns 'true' the route is activated (allowed to proceed), if 
the method returns 'false' the route is blocked.

The Auth Guard uses the account service to check if the user is logged in. If they are
it returns 'true' from the canActivate() method, otherwise it returns 'false' and redirects
the user to the login page along with the 'returnUrl' in the query parameters.

Angular route guards are attached to routes in the router config. This auth guard is used
in app-routing.module.ts to protect the home page from '/users' routes.
*/
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private accountService: AccountService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.accountService.userValue;
    if (user) {
      // authorized so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}