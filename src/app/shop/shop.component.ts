import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item';
import { Observable } from 'rxjs';
import { Player } from '../models/player';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShopComponent implements OnInit {
  constructor(private itemService: ItemService, private playerService: PlayerService){
  }
  items: Item[] = [];
  playerTest: Player []= [];

      player = {
        name: 'Cowkilla23',
        currency: 5200,
        picture: 'assets/huey.jpg'
      }

  ngOnInit(): void {
    this.itemService.getItems()
    .subscribe({
      next:(items =>{
        this.items = items;
      })
    })
    this.playerService.getPlayer(1)
    .subscribe({
      next:(playerTest =>{
        console.log(playerTest)
      })
    })
  }

  ngAfterViewInit(){
  }

  buyItem(itemPrice:number){
    this.player.currency -= itemPrice;
    // missing api call to update player currency
  }
}
