import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShopComponent implements OnInit {
  constructor(private itemService: ItemService){
  }
  items: Item[] = [];

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
  }

  ngAfterViewInit(){
  }

  buyItem(itemPrice:number){
    this.player.currency -= itemPrice;
    // missing api call to update player currency
  }
}
