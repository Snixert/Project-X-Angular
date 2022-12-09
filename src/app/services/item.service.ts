import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item';
import { ItemStat } from '../models/itemstat';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getItems(): Observable<Item[]>{
    return this.http.get<Item[]>(this.baseApiUrl + 'api/items');
  }

  getItem(id: number): Observable<Item>{
    return this.http.get<Item>(this.baseApiUrl + 'api/items/' + id);
  }

  getItemStats(id: number): Observable<ItemStat[]>{
    return this.http.get<ItemStat[]>(this.baseApiUrl + 'api/items/stats/' + {id});
  }
}