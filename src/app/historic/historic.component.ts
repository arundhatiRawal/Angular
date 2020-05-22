import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistoricService } from './historic.service'
import { Historic } from './historic';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HomeService } from '../home/home.service';
import { DisplayHostnameService } from '../display-hostname/display-hostname.service';
import { Memory } from '../memory/memory';
import { log } from 'util';
@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.css']
})
export class HistoricComponent implements OnInit {
  historic:Historic={} ;
  data:string []=new Array();
  hostname: string;
  hostnameList: string[]=new Array();
  hostnameNew: string;
  subscription: Subscription;
  selectedName : string;
  memory : Memory[];
  selectedTimestamp: Date;
  selectedTimestamp2: Date;
  selectedPreset: string;
  newDate: Date = new Date();

  
  constructor(private router: Router, private historicService: HistoricService,private homeService: HomeService,private displayService : DisplayHostnameService) { }
  
  ngOnInit() {
    this.getAll();
    this.displayService.currentMessage.subscribe(message => this.hostnameNew=message)
    
    if(this.hostnameNew=="null"){
      //the options from the real time component has not been chosen yet
      this.homeService.currentMessage.subscribe(message => this.hostname=message)
      //therefore, the hostname is hostname given from home page
    }else{
      this.displayService.currentMessage.subscribe(message => this.hostname=message)
    }
    console.log("name of host - "+this.hostname)
    this.historicService.putHostname(this.hostname) //pass it on to the service 
    
  }

  myClickFunction($event) {
    this.selectedName = $event.target.options[$event.target.options.selectedIndex].text;
    console.log("display nav"+this.selectedName)
    this.hostname=this.selectedName;
  }

  myClickFunction2($event) {
    this.selectedTimestamp = $event.target.value;
    console.log(this.selectedTimestamp);
  }

  myClickFunction4($event) {
    this.selectedTimestamp2 = $event.target.value;
    console.log(this.selectedTimestamp2);
  }


  myClickFunction3($event) {
    this.selectedPreset = $event.target.options[$event.target.options.selectedIndex].text;
    console.log("Preset "+this.selectedPreset)
    
  }

  
  
  onView(){
    //console.log(this.historic);
   
    console.log(this.selectedTimestamp);
    console.log(this.selectedTimestamp2);
    //console.log(this.selectedPreset);
    this.data[0]=this.selectedTimestamp.toString().concat(":00");
    this.data[1]=this.selectedTimestamp2.toString().concat(":00");
    this.historic.fromTimestamp=this.data[0].replace('T', '_');
    this.historic.toTimestamp=this.data[1].toString().replace('T','_');
    console.log(JSON.stringify(this.historic)); 
    //console.log(this.data)
    
    
  }

  public getAll() {
    this.displayService.getHostname()
      .subscribe(data => {
        this.memory = data;
        let j = 0;
        for (let i = 0; i < this.memory.length; ++i) {
          
          if (!this.hostnameList.includes(this.memory[i]['hostname'])) {
            this.hostnameList[j] = this.memory[i]['hostname'];
            ++j;
          }

        }
       // console.log("display hostname"+this.hostname);
      });
    }

}

