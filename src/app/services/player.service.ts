import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item';
import { Player } from '../models/player';
import { PlayerStat } from '../models/playerstat';
import { UpdateStatsRequest } from '../models/updatestatsrequest';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getPlayers(): Observable<Player[]>{
    return this.http.get<Player[]>(this.baseApiUrl + 'api/players');
  }

  getPlayer(id: number): Observable<Player>{
    return this.http.get<Player>(this.baseApiUrl + 'api/players/' + id);
  }

  getPlayerWeapon(id: number): Observable<Item>{
    return this.http.get<Item>(this.baseApiUrl + 'api/players/' + id + '/weapon');
  }

  getPlayerStats(id: number): Observable<PlayerStat[]>{
    return this.http.get<PlayerStat[]>(this.baseApiUrl + 'api/players/' + id + '/stats');
  }

  updatePlayerStats(id: number, statsRequest: UpdateStatsRequest[]): Observable<UpdateStatsRequest[]>{
    return this.http.put<UpdateStatsRequest[]>(this.baseApiUrl + 'api/players/' + id + '/stats', statsRequest);
  }

  updatePlayerWeapon(id: number, weaponId: number): Observable<Player>{
    return this.http.put<Player>(this.baseApiUrl + 'api/players/' + id + '/weapon/' + weaponId, weaponId);
  }
}