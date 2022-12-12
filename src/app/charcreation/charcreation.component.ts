import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charcreation',
  templateUrl: './charcreation.component.html',
  styleUrls: ['./charcreation.component.css']
})
export class CharcreationComponent implements OnInit {

  constructor() {}
  image: string = "";
  checkboxes = [{
    id:1,image:'assets/huey.jpg',isChecked: false
  },
  {
    id:2,image:'assets/huey.jpg',isChecked: false
  },
  {
    id:3,image:'assets/huey.jpg',isChecked: false
  }
  ]

  isChecked(userInput:number){
    this.checkboxes.forEach((checkbox)=>{
      if(userInput === checkbox.id){
        checkbox.isChecked = true;
        this.image = checkbox.image;
      }
      else{
        checkbox.isChecked = false;
      }
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    //needs to store info into player object
    //then API post call
    const input = <HTMLInputElement>document.getElementById('textbox');
    console.log(input.value);
    console.log(this.image);
  }
}
