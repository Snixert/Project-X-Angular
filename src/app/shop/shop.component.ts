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
  items?: Observable<Item[]>;
  inventory = {} as Inventory;
  player = {} as Player;

  ngOnInit(): void 
  {
    //ID parameter needs to be changed to the ID of currently
    //logged on user, and not "1"
    this.playerService.getPlayer(1).subscribe((player : Player) => (this.player = player));
    
    this.inventoryService.getPlayerInventory(1).subscribe((inventory : Inventory ) => (this.inventory = inventory));

    this.items = this.itemService.getItems();
  }

  canBuyItem(itemId:number, itemPrice:number) : Boolean
  {
    if(this.inventory.inventory?.filter((i : Item) => (i.itemId === itemId)).length <= 0 && this.player.currency >= itemPrice)
    {
      return true;
    }
    return false;
  }

  buyItem(itemPrice:number,itemId:number,itemName:string){
    if(this.canBuyItem(itemId,itemPrice))
    {
      const div = document.getElementById(itemName);
      this.player.currency -= itemPrice;
      this.inventoryService.addPlayerInventoryItem(1,itemId).subscribe();
      div?.classList.remove('buybutton');
      div?.classList.add('cantbuybutton');
    }
  }
}