import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Memory } from '../memory/memory';
import {BehaviorSubject} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class HomeService {
  private userUrl = '/apiMemory';
  private messageSource = new BehaviorSubject<string>("hey");
  currentMessage = this.messageSource.asObservable();

  constructor(private http:HttpClient) {}

  public getHostname() : Observable<Memory[]> {

    return this.http.get<Memory[]>(this.userUrl);
  }

  changeMessage(message: string){
      this.messageSource.next(message);
  }

}