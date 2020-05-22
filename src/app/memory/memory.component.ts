import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemoryService } from './memory.service'
import { Memory } from './memory'
import { interval, timer, Subscription } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { HomeComponent } from '../home/home.component';
import { DisplayHostnameService } from '../display-hostname/display-hostname.service';
import { HomeService } from '../home/home.service';


/*
const ELEMENT_DATA: Memory[] = [
  { id: '1', totalRam: '8 Gb', ramUsed: '100 mb', ramPercent: 'blah', available: 'blah', Cache: 'blah', swapTotal: 'blah', swapUsed: 'blah' }
];
*/

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css']
})

/*
export class MemoryComponent {
  constructor(private router: Router) {
    console.log(1);
  }
  displayedColumns: string[] = ['id', 'totalRam', 'ramUsed', 'ramPercent', 'available', 'Cache', 'swapTotal', 'swapUsed'];
  dataSource = ELEMENT_DATA;
}*/

export class MemoryComponent implements OnInit {

  memory: Memory[];
  subscription: Subscription; // subscribe for timer
  displayedColumns: string[] = ['TimeStamp','Total Ram', 'Ram Used', 'Ram Percent', 'Available', 'Cache', 'Total Swap Available', 'Swap Used', 'Cpu Percent'];
  parameter: String[] = new Array();
  parameterCpu: String[] = new Array();
  hostname: String;
  hostnameNew: string;

  constructor(private router: Router, private memoryService: MemoryService, private displayService: DisplayHostnameService, private homeService: HomeService) {

  }


  ngOnInit() {
    this.displayService.currentMessage.subscribe(message => this.hostnameNew = message)

    if (this.hostnameNew == "null") { //the option from the real time component has not been chosen yet
      this.homeService.currentMessage.subscribe(message => this.hostname = message)//therefore, the hostname is hostname given from home page
    } else {
      this.displayService.currentMessage.subscribe(message => this.hostname = message)
    }
    console.log("name of host memory - " + this.hostname)
    this.memoryService.putHostname(this.hostname) //pass it on to the service
    this.getAll();
  };

  public getAll() {
    this.memoryService.getMemoryDetails()
    .subscribe(data => {
      this.memory = data;

      for (let i = 0; i < this.memory.length; i++) {
        this.parameter[i] = this.memory[i]['ramPercent'];
        this.parameterCpu[i] = this.memory[i]['cpuPercent'];
        this.memory[i]['ramPercent'] = this.parameter[i].replace('%', ''); //replace the percent sign so that comparision becomes possible
        this.memory[i]['cpuPercent'] = this.parameterCpu[i].replace('%', ''); //replace the percent sign so that comparision becomes possible

      }
      console.log("Memory " + JSON.stringify(this.memory[1]));
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}