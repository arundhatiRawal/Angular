import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Power } from './power';
import { PowerService } from './power.service';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HomeService } from '../home/home.service';
import { DisplayHostnameService } from '../display-hostname/display-hostname.service';

@Component({
  selector: 'app-power',
  templateUrl: './power.component.html',
  styleUrls: ['./power.component.css']
})

export class PowerComponent implements OnInit {

  power: Power[];
  parameter: String[] = new Array();
  displayedColumns: string[] = ['TimeStamp', 'Core0', 'Core1', 'Core2', 'Core3'];
  hostname: string;
  hostnameNew : string;
  subscription: Subscription;

  constructor(private router: Router, private powerService: PowerService, private homeService : HomeService, private displayService : DisplayHostnameService) {

  }

  ngOnInit() {
    this.displayService.currentMessage.subscribe(message => this.hostnameNew = message)

    if (this.hostnameNew == "null") { //the option from the real time component has not been chosen yet
      this.homeService.currentMessage.subscribe(message => this.hostname = message)//therefore, the hostname is hostname given from home page
    } else {
      this.displayService.currentMessage.subscribe(message => this.hostname = message)
    }
    console.log("name of host memory - " + this.hostname)
    this.powerService.putHostname(this.hostname) //pass it on to the service
    this.getAll();
  };

  public getAll() {
    this.subscription = timer(0, 20000).pipe(
      switchMap(() => this.powerService.getPowerDetails())
    ).subscribe(data => {
      this.power = data;
      console.log(this.power.length)
      //console.log(this.power['core0'])
      for (let i = 0; i < this.power.length; i++) {
        this.parameter[i] = this.power[i]['core0'];
        this.power[i]['core0'] = this.parameter[i].replace('°C', ''); //replace the degree sign so that comparision becomes possible
        this.parameter[i] = this.power[i]['core1'];
        this.power[i]['core1'] = this.parameter[i].replace('°C', ''); //replace the degree sign so that comparision becomes possible

        this.parameter[i] = this.power[i]['core2'];
        this.power[i]['core2'] = this.parameter[i].replace('°C', ''); //replace the degree sign so that comparision becomes possible

        this.parameter[i] = this.power[i]['core3'];
        this.power[i]['core3'] = this.parameter[i].replace('°C', ''); //replace the degree sign so that comparision becomes possible
      }

      console.log("Power " + JSON.stringify(this.power));
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

