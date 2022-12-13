import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item';
import { Observable } from 'rxjs';
import { Player } from '../models/player';
import { PlayerService } from '../services/player.service';
import { AddPlayerRequest } from '../models/addplayerrequest';

@Component({
  selector: 'app-charcreation',
  templateUrl: './charcreation.component.html',
  styleUrls: ['./charcreation.component.css']
})
export class CharcreationComponent implements OnInit {
  constructor(private playerService: PlayerService){
  }
  
  player = {} as AddPlayerRequest;
  checkboxes = [{
    id:0,image:'assets/huey.jpg'
  },
  {
    id:1,image:'assets/riley_600x672.jpg'
  },
  {
    id:2,image:'assets/granddad_600x672.jpg'
  }
  ]

  isChecked(userInput:number){
    this.checkboxes.forEach((checkbox)=>{
      if(userInput === checkbox.id){
        this.player.image = checkbox.image;
      }
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    const input = <HTMLInputElement>document.getElementById('textbox');
    this.player.name = input.value;
    //accountId hardcoded while we wait for login project
    this.player.accountId = 8;
    this.playerService.addPlayer(this.player).subscribe();
  }
}
