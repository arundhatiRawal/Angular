import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import {ChartDisplayService} from './chart-display.service'
import {Memory} from '../Memory/memory'
 import * as moment from 'moment';
import { interval, timer, Subscription } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import {MemoryService} from '../Memory/memory.service'
import {Chart, ChartPoint} from 'chart.js'
import { Power } from '../power/power';
@Component({
  selector: 'app-chart-display',
  templateUrl: './chart-display.component.html',
  styleUrls: ['./chart-display.component.css']
})
export class ChartDisplayComponent implements OnInit {
  @ViewChild('canvas') canvasRef: ElementRef;
  @ViewChild('canvasCpu') canvasRef1: ElementRef;
  @ViewChild('canvasPower') canvasRef2: ElementRef;
  constructor( private ChartDisplayService: ChartDisplayService) { }
  memory: Memory[];
  subscription: Subscription; // subscribe for timer
  parameter: String[] = new Array();
  parameterCpu: String[] = new Array();
  hostname: String;
  public ram= new Array();
  public cpu= new Array();
  public core0= new Array();
  public core1= new Array();
  public core2= new Array();
  public core3= new Array();
  public timeRam:String[] = new Array();
  public timeCpu:String[] = new Array();
  public timePower:String[] = new Array();
  public datesRam =[];
  public datesCpu =[];
  public datesPower =[];
  chart:any;
  chartCpu:any;
  chartPower:any;
  power: Power[];
  




  ngOnInit(){
    //this.getRamPercent();
     // this.getCpuPercent();
     // this.getPower();
  
  }//ngonit
    ngAfterViewInit() {
      this.getRamPercent();
      this.getCpuPercent();
      this.getPower();
  
    }
  



  public getRamPercent()
  {
   
    this.subscription =
    this.ChartDisplayService.getMemoryDetails()
  .subscribe(data => {
    this.memory = data;

    for (let i = 0; i < this.memory.length; i++) {
      this.parameter[i] = this.memory[i]['ramPercent'];
      this.parameterCpu[i] = this.memory[i]['cpuPercent'];
      this.memory[i]['ramPercent'] = this.parameter[i].replace('%', ''); //replace the percent sign so that comparision becomes possible
      this.memory[i]['cpuPercent'] = this.parameterCpu[i].replace('%', ''); //replace the percent sign so that comparision becomes possible

    }
    console.log("Memory " + JSON.stringify(this.memory));
    for (let i = 0; i < this.memory.length; i++)
    {
      this.ram[i]=Number(this.memory[i]['ramPercent']);
      this.timeRam[i]=this.memory[i]['timestamp'];
    }
    console.log(this.ram);
    this.timeRam.forEach(element => {
      let jsdate=new Date(element.slice(0,10).concat(" ".concat(element.substring(11))))
      let formatted= moment(jsdate).format("MMMM Do YYYY , h:mm:ss a")
      this.datesRam.push(formatted.toString())
      
    });
    console.log(this.datesRam);
    console.log(this.timeRam);
  
  this.chart=new Chart(this.canvasRef.nativeElement.getContext('2d'), {
    type: 'line',
  data: {
   labels: this.datesRam,
   
  
   datasets: [{
       label:'ram percent',
       data: this.ram,
       borderColor: '#3cba9f',
       fill:false
          
   }]
  }, 
  options: {
    responsive:false,
    maintainAspectRatio:true,
    title: {
      display: true,
      text: 'Ram Percent'
    },
     
        
      legend: {
        positon:'right',
        display: true },
    scales: {
      xAxes: [{
        display: true
      }],
      yAxes: [{
        display: true
      }]
    }
   
  }
  })
}); 
  }
  public getCpuPercent()
  {
    this.subscription =
    this.ChartDisplayService.getMemoryDetails()
  .subscribe(data => {
    this.memory = data;

    for (let i = 0; i < this.memory.length; i++) {
      this.parameter[i] = this.memory[i]['ramPercent'];
      this.parameterCpu[i] = this.memory[i]['cpuPercent'];
      this.memory[i]['ramPercent'] = this.parameter[i].replace('%', ''); //replace the percent sign so that comparision becomes possible
      this.memory[i]['cpuPercent'] = this.parameterCpu[i].replace('%', ''); //replace the percent sign so that comparision becomes possible

    }
    console.log("Memory " + JSON.stringify(this.memory));
    for (let i = 0; i < this.memory.length; i++)
    {
      this.cpu[i]=Number(this.memory[i]['cpuPercent']);
      this.timeCpu[i]=this.memory[i]['timestamp'];
    }
    console.log(this.cpu);
    this.timeCpu.forEach(element => {
      let jsdate=new Date(element.slice(0,10).concat(" ".concat(element.substring(11))))
      let formatted= moment(jsdate).format("MMMM Do YYYY , h:mm:ss a")
      this.datesCpu.push(formatted.toString())
      
    });
    console.log(this.datesCpu);
    console.log(this.timeCpu);
    this.chartCpu=new Chart(this.canvasRef1.nativeElement.getContext('2d'), {
      type: 'line',
    data: {
     labels: this.datesCpu,
     
    
     datasets: [{
         label:"Cpu Percent",
         data: this.cpu,
         borderColor: '#e43af4',
         fill:false
    }]
    }, 
    options: {
      responsive:false,
     maintainAspectRatio:true,
     title: {
      display: true,
      text: 'Cpu Percent'
    },
     
        
      legend: {
        positon:'right',
        display: true },
      scales: {
        xAxes: [{
          display: true
        }],
        yAxes: [{
          display: true
        }]
      }
     
    }
    });
  }); 
  }
  getPower(){

    this.subscription =
    this.ChartDisplayService.getPowerDetails()
  .subscribe(data => {
    this.power = data;
    console.log("Power " + JSON.stringify(this.power));
    for (let i = 0; i < this.power.length; i++)
    {
      this.core0[i]=Number(this.power[i]['core0'].slice(1,5));
      this.core1[i]=Number(this.power[i]['core1'].slice(1,5));
      this.core2[i]=Number(this.power[i]['core2'].slice(1,5));
      this.core3[i]=Number(this.power[i]['core3'].slice(1,5));
      this.timePower[i]=this.power[i]['timestamp'];
    }
    this.timePower.forEach(element => {
      let jsdate=new Date(element.slice(0,10).concat(" ".concat(element.substring(11))))
      let formatted= moment(jsdate).format("MMMM Do YYYY , h:mm:ss a")
      this.datesPower.push(formatted.toString())
      
    });
    this.chartPower=new Chart(this.canvasRef2.nativeElement.getContext('2d'), {
      type: 'line',
    data: {
     labels: this.datesPower,
     
    
     datasets: [
      
      {
      label:"core0",   
      data: this.core0,
      borderColor: '#e43af4',
      fill:false
      
      },
      {
        label:"core1" ,  
      data: this.core1,
      borderColor: '#3cba9f',
      fill:false
      },
      {
        label:"core2",    
        data: this.core2,
        borderColor: '#f4e43a',
        fill:false
      },
      {
        label:"core3",     
        data: this.core3,
        borderColor: '#873af4',
        fill:false
      }]
  
    }, 
    options: {
      responsive:false,
     maintainAspectRatio:true,
     title: {
      display: true,
      text: 'Temperature of different cores'
    },
     
        
      legend: {
        positon:"right",
        display: true },
      scales: {
        xAxes: [{
          display: true
        }],
        yAxes: [{
          labels:"Temperature",
          display: true
        }]
      }
     
    }
    });









  });
  }
  
  

}
  