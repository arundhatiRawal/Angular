import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Disk } from './disk';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class DiskService {

  constructor(private http:HttpClient) {}

  private userUrl = '/apiDisk';
  private postHostUrl = '';
  hostname : String;

  public getHostInfo() {
    this.postHostUrl = this.userUrl+"/"+this.hostname;
    console.log("url"+this.postHostUrl)
    return this.http.post<Disk>(this.postHostUrl,this.hostname);
  }

  public getDiskDetails(): Observable<Disk[]> {
    this.getHostInfo()
    return this.http.get<Disk[]>(this.postHostUrl);
  }

  putHostname(name){
   return this.hostname = name;
  }

}