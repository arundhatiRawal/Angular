import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Memory } from './memory';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MemoryService {

  constructor(private http: HttpClient) { }

  private userUrl = '/apiMemory';
  private postHostUrl = '';
  hostname : String;

  public getMemoryHostnames() : Observable<Memory[]> {

    return this.http.get<Memory[]>(this.userUrl); //get the disk details from the url
  }

  public getHostInfo() {
    
    this.postHostUrl = this.userUrl+"/"+this.hostname;
    console.log("url"+this.postHostUrl)
    return this.http.post<Memory>(this.postHostUrl,this.hostname);
  }

  public getMemoryDetails(): Observable<Memory[]> {
    this.getHostInfo()
    return this.http.get<Memory[]>(this.postHostUrl);
  }

  putHostname(name){
   return this.hostname = name;
  }

}