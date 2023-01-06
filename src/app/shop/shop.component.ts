import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item';
import { Observable } from 'rxjs';
import { Player } from '../models/player';
import { PlayerService } from '../services/player.service';
import { InventoryService } from '../services/inventory.service';
import { Inventory } from '../models/inventory';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShopComponent implements OnInit {
  constructor(private inventoryService: InventoryService,private itemService: ItemService, private playerService: PlayerService){
  }
  items: Item[] = [];
  inventory = {} as Inventory;
  player = {} as Player;
  alreadyBought: boolean[] = [];

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
    this.inventoryService.getPlayerInventory(1)
    .subscribe({
      next:(inventory =>{
        this.inventory = inventory;
      })
    })
  }
  
  noItem(item2:number){
      for(let i = 0; i < this.inventory.inventory.length;i++){
        if(item2 === this.inventory.inventory[i].itemId){
          if(this.alreadyBought.length < this.items.length){
            this.alreadyBought.push(true);
          }
          return false;
        }
      }
      if(this.alreadyBought.length < this.items.length){
        this.alreadyBought.push(false);
      }
    return true;
  }

  buyItem(itemPrice:number,itemId:number,itemName:string){
    const div = document.getElementById(itemName);
    if(this.alreadyBought[itemId-1] === false){
      this.alreadyBought[itemId-1] = true;
      this.player.currency -= itemPrice;
      this.inventoryService.addPlayerInventoryItem(1,itemId).subscribe();
      div?.classList.remove('buybutton');
      div?.classList.add('cantbuybutton');
    }
  }
}