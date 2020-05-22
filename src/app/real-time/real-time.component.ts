import { Component, OnInit, Input } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { HomeService } from '../home/home.service';


@Component({
  selector: 'app-real-time',
  templateUrl: './real-time.component.html',
  styleUrls: ['./real-time.component.css']
})
export class RealTimeComponent implements OnInit {
  message : string;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
       this.homeService.currentMessage.subscribe(message => this.message=message)
       console.log("message"+this.message)
  }

}
