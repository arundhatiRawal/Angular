import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-springboot-client';
  /* displayElement: boolean;
  constructor(private router: Router){}
  ngOnInit(){
    console.log(this.router.url);
    if(this.router.url=="/")
    {
      this.displayElement=true;
    }
    else{
      this.displayElement=false;
    }
    console.log(this.displayElement);
  } */
}

