import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShopComponent implements OnInit {
    htmlCards:string = "";
    playerInfo:string;
    playerCurrency:string;

    items = [
      {
        name: 'Big Axe',
        price: 250,
        picture: "assets/bigaxe_512x512.jpg"
      },
      {
        name: 'Legendary Sword',
        price: 5000,
        picture: "assets/sword_512x512.jpg"
      },
      {
        name: 'Stick',
        price: 5,
        picture: "assets/stick_512x512.png"
      },
      {
        name: 'Shovel',
        price: 45,
        picture: "assets/shovel_512x512.jpeg"
      },
      {
        name: 'Rock',
        price: 2,
        picture: "assets/rock_512x512.jpg"
      }];

   constructor() {
    let text: string = "";
    let player = {
      name: 'Cowkilla23',
      currency: 5100
    }
    
    let items = [
      {
        name: 'Big Axe',
        price: 250,
        picture: "assets/bigaxe_512x512.jpg"
      },
      {
        name: 'Legendary Sword',
        price: 5000,
        picture: "assets/sword_512x512.jpg"
      },
      {
        name: 'Stick',
        price: 5,
        picture: "assets/stick_512x512.png"
      },
      {
        name: 'Shovel',
        price: 45,
        picture: "assets/shovel_512x512.jpeg"
      },
      {
        name: 'Rock',
        price: 2,
        picture: "assets/rock_512x512.jpg"
      }];
      
      this.playerInfo = `<span>`+player.name+`</span>
      <img class="profilePic" src="assets/huey.jpg" alt="N/A">`

      this.playerCurrency = `<span>`+player.currency+`</span>`;
      
      // items.forEach(function(item){
      // if(player.currency >= item.price){
      //   text +=
      //   `
      //     <div class="card">
      //       <img class="cardcash" src="assets/coins.png" alt="N/A">
      //       <span class="price">`+item.price+`</span>
      //       <p class="itemName">`+item.name+`</p>
      //       <div class="buybutton" id="buybutton">
      //         <p class="buttonText">Buy</p>
      //       </div>
      //       <div>
      //         <img class = "item" src="`+ item.picture+`" alt="N/A">
      //       </div>
      //     </div>
      //   `
      // }
      // else{
      //   text +=
      //   `
      //     <div class="card">
      //       <img class="cardcash" src="assets/coins.png" alt="N/A">
      //       <span class="price">`+item.price+`</span>
      //       <p class="itemName">`+item.name+`</p>
      //       <div class="cantbuybutton">
      //         <p class="buttonText">Buy</p>
      //       </div>
      //       <div>
      //         <img class = "item" src="`+ item.picture+`" alt="N/A">
      //       </div>
      //     </div>
      //   `
      // }
      // });
      // this.htmlCards = text;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(){    
    // var buttns = document.getElementsByClassName("buybutton");
    // for(var i = 0; i < buttns.length; i++){
    //   buttns[i].addEventListener("click",(event)=>console.log(buttns[i].parentElement));
    // }

    // console.log(buttns[3].parentElement);

  }

  response(){
    console.log("works");
    console.log()
  }
}
