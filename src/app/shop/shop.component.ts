import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShopComponent implements OnInit {

    // missing api call to fetch item+player data
    items = [
      {
        name: 'Big Axe',
        price: 250,
        picture: 'assets/bigaxe_512x512.jpg'
      },
      {
        name: 'Legendary Sword',
        price: 5000,
        picture: 'assets/sword_512x512.jpg'
      },
      {
        name: 'Stick',
        price: 5,
        picture: 'assets/stick_512x512.png'
      },
      {
        name: 'Shovel',
        price: 45,
        picture: 'assets/shovel_512x512.jpeg'
      },
      {
        name: 'Rock',
        price: 2,
        picture: 'assets/rock_512x512.jpg'
      }];

      player = {
        name: 'Cowkilla23',
        currency: 5200,
        picture: 'assets/huey.jpg'
      }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
  }

  buyItem(itemPrice:number){
    this.player.currency -= itemPrice;
    // missing api call to update player currency
  }
}
