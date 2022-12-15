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
  player = {} as Player;
  //Need API call to get account data
  account = {
    playerId: 1,
    name: "Sylvain"
  }

  ngOnInit(): void {
    if(this.account.playerId != null){
      this.playerService.getPlayer(this.account.playerId)
      .subscribe({
        next:(player =>{
          this.player = player;
        })
      })
    }
  }
}
