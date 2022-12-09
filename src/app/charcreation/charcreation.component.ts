import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charcreation',
  templateUrl: './charcreation.component.html',
  styleUrls: ['./charcreation.component.css']
})
export class CharcreationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    const input = <HTMLInputElement>document.getElementById('textbox');
    console.log(input.value);
    input.value = "";
  }
}
