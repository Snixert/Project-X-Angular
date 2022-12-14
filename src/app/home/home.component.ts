import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../services/player.service';
import { Player } from '../models/player';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private playerService: PlayerService) {
  }
  
  //Need API call to check if logged in user has a player
  account = {
    playerId: 2
  }

  ngOnInit(): void {
  }
}
