import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Inventory } from '../models/inventory';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getPlayerInventory(id: number): Observable<Inventory>{
    return this.http.get<Inventory>(this.baseApiUrl + 'api/inventory/' + id);
  }

  addPlayerInventoryItem(playerId: number, itemId: number){
    return this.http.post<Item>(this.baseApiUrl + 'api/inventory/' + playerId + '/add/' + itemId, itemId);
  }

  removePlayerInventoryItem(playerId: number, itemId: number){
    return this.http.delete<Item>(this.baseApiUrl + 'api/inventory/' + playerId + '/remove/' + itemId);
  }
}
