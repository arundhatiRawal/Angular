import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Power } from './power';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class PowerService {
  constructor(private http: HttpClient) { }

  private userUrl = '/apiPower';
  private postHostUrl = '';
  hostname : String;

  public getHostInfo() {
    
    this.postHostUrl = this.userUrl+"/"+this.hostname;
    console.log("url"+this.postHostUrl)
    return this.http.post<Power>(this.postHostUrl,this.hostname);
  }

  public getPowerDetails(): Observable<Power[]> {
    this.getHostInfo()
    return this.http.get<Power[]>(this.postHostUrl);
  }

  putHostname(name){
   return this.hostname = name;
  }

}