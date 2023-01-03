import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  check = false;
  // TODO: API call for userinfo
  user = {
    name:'cowkilla63',
    password:'whatupdawg5454'
  }
  constructor() { }

  ngOnInit(): void {
  }

  onChange(){
    const textDiv = <HTMLInputElement>document.getElementById('textDiv');
    const userInput = <HTMLInputElement>document.getElementById('userInput');
    if(!this.check){
      textDiv.textContent = 'Save';
      this.check = true;
      userInput.removeAttribute('readonly');
    }
    else if(this.check){
      textDiv.textContent = 'Edit';
      this.user.name = userInput.value;
      this.check = false;
      userInput.setAttribute('readonly',this.user.name);
      // test
      console.log(this.user.name);
    }
  }
}
