import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Historic } from './historic';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HistoricService {
  headers: HttpHeaders | { 'Content-Type': 'application/json' };

  constructor(private http: HttpClient) { }
  private userUrl = '/apiHistoric';
  private postHostUrl = '';
  hostname : String;

 
  public postTimestamps(historic:Historic){
    this.postHostUrl = `${this.userUrl}/${this.hostname}`;
    return this.http
      .put(this.postHostUrl, JSON.stringify(historic), {headers: this.headers})
      .toPromise()
      .then(() => historic)
  }

  putHostname(name){
   return this.hostname = name;
  }
}
