// Root component for the App, this defines the root tag <app-root></app-root> used in the index.html file.

import { Component } from '@angular/core';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { BackgroundService } from './_services/background.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  title = 'project-x';
  subBg: Subscription;
  style = {
    'background-image': '',
    height: '100vh',
    width: '100vw',

  };

  constructor(private storageService: StorageService, private authService: AuthService, private backgroundService: BackgroundService) {
    this.subBg = Subscription.EMPTY;
  }

  ngOnInit(): void {
    this.subBg = this.backgroundService.bgPath.subscribe((bgPath) => {
      this.style['background-image'] = 'url(' + bgPath + ')';
    });
    this.isLoggedIn = this.storageService.isLoggedIn();

    // check if user is logged in, if true then get users roles and set value for showAdminBoard and showModeratorBoard flag. This controls how the template navbar displays items
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
    }
  }

  // logout method that reloads the window
  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
