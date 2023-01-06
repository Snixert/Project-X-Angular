/* The account layout component is the root component of the account feature/section of
the app. It binds the component to the account layout template with the 'templateUrl' 
property of the @Component decorator. it automatically redirects the user to the home page
if they are already logged in, to prevent an authenticated user from access '/account/login'
or '/account/register'.
*/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';

@Component({ templateUrl: './layout.component.html' })
export class LayoutComponent {

  constructor(private router: Router, private accountService: AccountService) {
    // redirect to /home if already logged in
    if (this.accountService.userValue) {
      this.router.navigate(['/']);
    }
  }
}
