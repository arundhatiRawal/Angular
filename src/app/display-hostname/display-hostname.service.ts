import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Memory } from '../memory/memory';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class DisplayHostnameService {
  private messageSource = new BehaviorSubject<string>("null");
  currentMessage = this.messageSource.asObservable();

  constructor(private http:HttpClient) {}

  private userUrl = '/apiMemory';

  public getHostname() : Observable<Memory[]> {

    return this.http.get<Memory[]>(this.userUrl);
  }
  
  changeMessage(message: string){
    this.messageSource.next(message);
}

}