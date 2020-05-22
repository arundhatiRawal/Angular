import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CpuService } from './cpu.service'
import { Cpu } from './cpu'
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HomeService } from '../home/home.service';
import { DisplayHostnameService } from '../display-hostname/display-hostname.service';

/*const ELEMENT_DATA: Cpu[] =[
  {id: '1', cpuPercent: '82'},
  {id: '2',cpuPercent:'20'}
];
*/

@Component({
  selector: 'app-cpu',
  templateUrl: './cpu.component.html',
  styleUrls: ['./cpu.component.css']
})

/*
export class CpuComponent{
  constructor(private router: Router){
    console.log(1);
  }
  displayedColumns: string[] = ['id','cpuPercent'];
  dataSource = ELEMENT_DATA;
  cpuPercentNum = Number("82");
}
*/
export class CpuComponent implements OnInit {

  cpu: Cpu[];
  hostname: string;
  hostnameNew: string;
  subscription: Subscription;

  constructor(private router: Router, private cpuService: CpuService,private homeService: HomeService,private displayService : DisplayHostnameService) {

  }

  ngOnInit() {
    //this.hostname = this.displayName.selectedName
    //console.log("cpu", this.hostname)
    //this.homeService.currentMessage.subscribe(message => this.hostname=message)
    this.displayService.currentMessage.subscribe(message => this.hostnameNew=message)
    
    if(this.hostnameNew=="null"){
      //the options from the real time component has not been chosen yet
      this.homeService.currentMessage.subscribe(message => this.hostname=message)
      //therefore, the hostname is hostname given from home page
    }else{
      this.displayService.currentMessage.subscribe(message => this.hostname=message)
    }
    console.log("name of host cpu- "+this.hostname)
    this.cpuService.putHostname(this.hostname) //pass it on to the service
    this.getAll();
  };

  public getAll() {
    this.subscription = timer(0, 20000).pipe(
      switchMap(() => this.cpuService.getCpuDetails())
    ).subscribe(data => {
      this.cpu = data;
      console.log("Cpu " + JSON.stringify(this.cpu));
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    //this.hostnameNew="null"
  }


}