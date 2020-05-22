import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TopDisk } from './top-disk';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TopDiskService {

  constructor(private http: HttpClient) { }

  private userUrl = '/apiTopDisk';
  private postHostUrl = '';
  hostname : String;

  //public getDiskList(): Observable<TopDisk[]> {
  //  return this.http.get<TopDisk[]>(this.userUrl); // get details of the top disk using files from the url given
 // }

  public getHostInfo() {
    this.postHostUrl = this.userUrl+"/"+this.hostname;
    console.log("url"+this.postHostUrl)
    return this.http.post<TopDisk>(this.postHostUrl,this.hostname);
  }

  public getDiskList(): Observable<TopDisk[]> {
    this.getHostInfo()
    return this.http.get<TopDisk[]>(this.postHostUrl);
  }

  putHostname(name){
   return this.hostname = name;
  }

}