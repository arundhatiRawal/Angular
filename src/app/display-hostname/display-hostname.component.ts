import { Component, OnInit } from '@angular/core';
import { DisplayHostnameService } from './display-hostname.service';
import { Memory } from '../memory/memory';

@Component({
  selector: 'app-display-hostname',
  templateUrl: './display-hostname.component.html',
  styleUrls: ['./display-hostname.component.css']
})
export class DisplayHostnameComponent implements OnInit {
  hostname: string[] = new Array();
  selectedName : string;
  memory : Memory[];

  constructor(private displayService : DisplayHostnameService) { }

  ngOnInit() {
    this.getAll();
  };

  myClickFunction($event) {
    this.selectedName = $event.target.options[$event.target.options.selectedIndex].text;
    console.log("display nav"+this.selectedName)
    this.displayService.changeMessage(this.selectedName)
  }

  public getAll() {
    this.displayService.getHostname()
      .subscribe(data => {
        this.memory = data;
        let j = 0;
        for (let i = 0; i < this.memory.length; ++i) {
          if (!this.hostname.includes(this.memory[i]['hostname'])) {
            this.hostname[j] = this.memory[i]['hostname'];
            ++j;
          }

        }
       // console.log("display hostname"+this.hostname);
      });
    }
}
