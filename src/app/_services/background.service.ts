//This service provides background images to the subscribed components

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {
  constructor() { }

  private bgInit = '/src/app/assets/Background.jpg'
  bgPath: BehaviorSubject<string> = new BehaviorSubject(this.bgInit);
}
