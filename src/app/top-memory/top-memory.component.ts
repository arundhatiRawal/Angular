import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription, timer } from 'rxjs';

import { switchMap } from 'rxjs/operators';
import { TopRam } from './top-memory';
import { TopRamService } from './top-memory.service';
import { HomeComponent } from '../home/home.component';
import { DisplayHostnameService } from '../display-hostname/display-hostname.service';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-disk',
  templateUrl: './top-memory.component.html',
  styleUrls: ['./top-memory.component.css']
})

export class TopMemoryComponent implements OnInit {

  memoryList: TopRam[];
  hostname: string;
  hostnameNew : string;
  subscription: Subscription;

  displayedColumns: string[] = ['TimeStamp','Process Id', 'User Id', 'Memory Percent'];

  constructor(private router: Router, private topMemoryService: TopRamService, private displayService : DisplayHostnameService, private homeService : HomeService) {

  }
  ngOnInit() {
    this.displayService.currentMessage.subscribe(message => this.hostnameNew = message)

    if (this.hostnameNew == "null") { //the option from the real time component has not been chosen yet
      this.homeService.currentMessage.subscribe(message => this.hostname = message)//therefore, the hostname is hostname given from home page
    } else {
      this.displayService.currentMessage.subscribe(message => this.hostname = message)
    }
    console.log("name of host memory list - " + this.hostname)
    this.topMemoryService.putHostname(this.hostname) //pass it on to the service
    this.getAll();
  };

  public getAll() {
    this.subscription = timer(0, 20000).pipe(
      switchMap(() => this.topMemoryService.getMemoryList())
    ).subscribe(data => {
      this.memoryList = data;
      console.log("MemoryList " + JSON.stringify(this.memoryList));
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}