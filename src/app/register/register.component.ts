// This component binds form data (username, email, password) from template
// to AuthService.Register() method that returns an Observable object

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { BackgroundService } from '../_services/background.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  registerBgImage = '/assets/diablo4mage.mp4';


  constructor(
    private authService: AuthService,
    private backgroundService: BackgroundService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.backgroundService.bgPath.next(this.registerBgImage);
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.register(username, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(["login"]);
      },
      error: err => {
        this.errorMessage = err.errorMessage;
        this.isSignUpFailed = true;
      }
    });
  }
}
