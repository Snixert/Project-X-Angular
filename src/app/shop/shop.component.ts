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
  inventory1: Inventory ={
    inventory:
  }
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
    this.inventoryService.getPlayerInventory(1)
    .subscribe({
      next:(inventory =>{
        this.inventory = inventory;
        console.log(this.inventory.inventory[1]);
      })
    })
  }

  ngAfterViewInit(){
  }

  noItem(){
    // this.inventory.inventory.forEach(function(item){
      
    // })
    
    return false;
  }

  buyItem(itemPrice:number,itemId:number){
    this.player.currency -= itemPrice;
    // api call to update player currency and player inventory
    this.inventoryService.addPlayerInventoryItem(1,itemId).subscribe();
  }
}
