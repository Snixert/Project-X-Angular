import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Stat } from '../models/stat';


@Injectable({
  providedIn: 'root'
})
export class StatService {
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getStats(): Observable<Stat[]>{
    return this.http.get<Stat[]>(this.baseApiUrl + 'api/stats');
  }
}
