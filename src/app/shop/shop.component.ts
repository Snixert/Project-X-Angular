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
  player = {} as Player;

  ngOnInit(): void {
    this.itemService.getItems()
    .subscribe({
      next:(items =>{
        this.items = items;
      })
    })
    //ID parameter needs to be changed to the ID of currently
    //logged on user, and not "1"
    this.playerService.getPlayer(1)
    .subscribe({
      next:(player =>{
        this.player = player;
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
