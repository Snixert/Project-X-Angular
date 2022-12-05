// The Home component uses UserService to get public resources from back-end

import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { BackgroundService } from '../_services/background.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  content?: string;

  constructor(private userService: UserService, private backgroundService: BackgroundService) { }

  homeBgImage = '/assets/wowLoginScreen.png'

  ngOnInit(): void {
    this.backgroundService.bgPath.next(this.homeBgImage);

    this.userService.getPublicContent().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        console.log(err)
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = 'Error with status:  + ${err.status} - ${err.statusText}';
          }
        } else {
          this.content = 'Error with status:  + ${err.status}';
        }
      }
    });
  }
}
