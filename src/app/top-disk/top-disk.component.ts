import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TopDisk } from './top-disk';
import { TopDiskService } from './top-disk.service';
import { DisplayHostnameService } from '../display-hostname/display-hostname.service';
import { HomeService } from '../home/home.service';


@Component({
  selector: 'app-top-disk',
  templateUrl: './top-disk.component.html',
  styleUrls: ['./top-disk.component.css']
})

export class TopDiskComponent implements OnInit {

  diskList: TopDisk[];
  displayedColumns: string[] = ['TimeStamp', 'File Size', 'File Name'];
  hostname: string;
  hostnameNew : string;
  subscription: Subscription;

  constructor(private router: Router, private topDiskService: TopDiskService, private displayService: DisplayHostnameService, private homeService: HomeService) {

  }

  ngOnInit() {
    this.displayService.currentMessage.subscribe(message => this.hostnameNew = message)

    if (this.hostnameNew == "null") { //the option from the real time component has not been chosen yet
      this.homeService.currentMessage.subscribe(message => this.hostname = message)//therefore, the hostname is hostname given from home page
    } else {
      this.displayService.currentMessage.subscribe(message => this.hostname = message)
    }
    console.log("name of host topDisk - " + this.hostname)
    this.topDiskService.putHostname(this.hostname) //pass it on to the service
    this.getAll();
  };

  public getAll() {
    this.topDiskService.getDiskList()
      .subscribe(data => {
        this.diskList = data;
        console.log("DiskList " + JSON.stringify(this.diskList));
      });
  }


}