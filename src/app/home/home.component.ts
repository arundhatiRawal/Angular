import { Component, OnInit } from '@angular/core';
import { getAllDebugNodes } from '@angular/core/src/debug/debug_node';
import { HomeService } from './home.service';
import { Memory } from '../memory/memory';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  hostname: string[] = new Array();
  selectedName : string;
  memory: Memory[];

  constructor(private homeService: HomeService) { }

   ngOnInit() {
    this.getAll();
  };

  myClickFunction($event) {
    this.selectedName = $event.target.options[$event.target.options.selectedIndex].text;
    console.log("main nav"+this.selectedName)
    this.homeService.changeMessage(this.selectedName)
  }

  public getAll() {
    this.homeService.getHostname()
      .subscribe(data => {
        this.memory = data;
        let j = 0;
        for (let i = 0; i < this.memory.length; ++i) {
          if (!this.hostname.includes(this.memory[i]['hostname'])) {
            this.hostname[j] = this.memory[i]['hostname'];
            ++j;
          }

        }
        console.log(this.hostname);
      });
  }
}
