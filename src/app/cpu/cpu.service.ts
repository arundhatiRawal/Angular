import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cpu } from './cpu';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class CpuService {

  constructor(private http:HttpClient) {}

  private userUrl = '/apiCpu';
  private postHostUrl = '';
  hostname : String;

  public getHostInfo() {
    this.postHostUrl = this.userUrl+"/"+this.hostname;
    console.log("url"+this.postHostUrl)
    return this.http.post<Cpu>(this.postHostUrl,this.hostname);
  }

  public getCpuDetails(): Observable<Cpu[]> {
    this.getHostInfo()
    return this.http.get<Cpu[]>(this.postHostUrl);
  }


  putHostname(name){
   return this.hostname = name;
  }


}