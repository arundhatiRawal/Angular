import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiskService } from './disk.service';
import { Disk } from './disk';
import { Subscription } from 'rxjs';
import { DisplayHostnameComponent } from '../display-hostname/display-hostname.component';
import { HomeComponent } from '../home/home.component';
import { HomeService } from '../home/home.service';
import { DisplayHostnameService } from '../display-hostname/display-hostname.service';


/*const ELEMENT_DATA: Disk[] = [
  {id: '1', fileSys: 'Folder1', size: '100 mb' , used: 'blah', available: 'blah',usedPercent: 'blah',mountPoint: 'blah' },
  {id: '2', fileSys: 'Folder1', size: '100 mb' , used: 'blah', available: 'blah',usedPercent: 'blah',mountPoint: 'blah' },
  {id: '3', fileSys: 'Folder1', size: '100 mb' , used: 'blah', available: 'blah',usedPercent: 'blah',mountPoint: 'blah' }

];*/
@Component({
  selector: 'app-disk1',
  templateUrl: './disk.component.html',
  styleUrls: ['./disk.component.css']
})
/*export class DiskComponent {
  constructor(private router:Router){
    console.log(1);

  }
  displayedColumns: string[] = ['id', 'fileSys', 'size', 'used','available','usedPercent','mountPoint'];
  dataSource = ELEMENT_DATA;
}*/

export class DiskComponent implements OnInit {

  disk: Disk[];
  hostname: string;
  hostnameNew : string;
  parameter: String[] = new Array();
  subscription: Subscription;
  displayedColumns: string[] = ['TimeStamp', 'File System', 'Size', 'Used Space', 'Available', 'Used Percentage', 'Mount Point'];

  constructor(private router: Router, private diskService: DiskService, private homeService: HomeService,private displayService : DisplayHostnameService) {

  }

  ngOnInit() {
    this.displayService.currentMessage.subscribe(message => this.hostnameNew=message)
    
    if(this.hostnameNew=="null"){
      //the options from the real time component has not been chosen yet
      this.homeService.currentMessage.subscribe(message => this.hostname=message)
      //therefore, the hostname is hostname given from home page
    }else{
      this.displayService.currentMessage.subscribe(message => this.hostname=message)
    }
    console.log("name of host cpu - "+this.hostname)
    this.diskService.putHostname(this.hostname) //pass it on to the service
    this.getAll();
  };

  public getAll() {
    this.diskService.getDiskDetails()
      .subscribe(data => {
        this.disk = data;
        for (let i = 0; i < this.disk.length; i++) {
          this.parameter[i] = this.disk[i]['usedPercent'];
          this.disk[i]['usedPercent'] = this.parameter[i].replace('%', ''); //replace the percent sign so that comparision becomes possible
  
        }
        console.log("Disk" + JSON.stringify(this.disk));
      });

  }

}

