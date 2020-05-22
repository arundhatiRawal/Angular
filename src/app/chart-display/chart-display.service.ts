import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Memory } from '../Memory/memory'
import {Power} from '../Power/power'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ChartDisplayService {

  constructor(private http: HttpClient) { }
  private powerUrl = '/apiChartPower'
  private userUrl = '/apiChartDisplay';
  private postHostUrl = '';
  private postPowerHostUrl = '';
  hostname : String = "sapna";
  public point:Object;

  public getMemoryHostnames() : Observable<Memory[]> {

    return this.http.get<Memory[]>(this.userUrl); //get the disk details from the url
  }
/* 
  public getPowerHostnames() : Observable<Power[]> {

    return this.http.get<Power[]>(this.powerUrl); //get the disk details from the url
  } */

  public getHostInfo() {
    
    this.postHostUrl = this.userUrl+"/"+this.hostname;
    
    console.log("url"+this.postHostUrl)
    return this.http.post<Memory>(this.postHostUrl,this.hostname);
  }
  public getPowerHostInfo() {
    
    
    this.postPowerHostUrl = this.powerUrl+"/"+this.hostname;
    console.log("url"+this.postPowerHostUrl)
    return this.http.post<Power>(this.postPowerHostUrl,this.hostname);
  }

  public getMemoryDetails(): Observable<Memory[]> {
    this.getHostInfo()
    return this.http.get<Memory[]>(this.postHostUrl);
  }

  public getPowerDetails(): Observable<Power[]> {
    this.getPowerHostInfo()
    return this.http.get<Power[]>(this.postPowerHostUrl);
  }

  putHostname(name){
   return this.hostname = name;
  }

  

}
