import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TopRam } from './top-memory';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TopRamService {

  constructor(private http: HttpClient) { }

  private userUrl = '/apiTopMemory';
  private postHostUrl = '';
  hostname: String;

  // public getMemoryList() : Observable<TopRam[]> {
  //   return this.http.get<TopRam[]>(this.userUrl); //get processes occupying the most space from the URL 
  // }

  public getHostInfo() {
    this.postHostUrl = this.userUrl + "/" + this.hostname;
    console.log("url" + this.postHostUrl)
    return this.http.post<TopRam>(this.postHostUrl, this.hostname);
  }

  public getMemoryList(): Observable<TopRam[]> {
    this.getHostInfo()
    return this.http.get<TopRam[]>(this.postHostUrl);
  }

  putHostname(name) {
    return this.hostname = name;
  }

}