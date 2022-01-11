import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginauthService } from '../services/loginauth.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { BLACK_ON_WHITE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  animations: [
    trigger('hovermenu', [
      // ...
      state('onhover', style({
        opacity: 1,

        backgroundColor: 'orangered',
        color:"white"
      })),
      state('intial', style({
        color:"navajowhite",
        backgroundColor: 'tomato'
      })),
      state('onhoverread', style({
        opacity: 1,

        backgroundColor: 'orangered',
        color:"white"
      })),
      state('intialread', style({
        color:"navajowhite",
        backgroundColor: 'tomato'
      })),
      transition('intial => onhover', [
        animate('1s')
      ]),
      transition('onhover => intial', [
        animate('0.8s'),

      ]),
      transition('intialread => onhoverread', [
        animate('1s')
      ]),
      transition('onhoverread => intialread', [
        animate('0.8s'),

      ]),
    ]),
  ]
})
export class HomepageComponent implements OnInit {
  username:string="";
  read="Click to Read Employee data"
  crud="Click to perform CRUD on Employee data"
  loading=false;
  loadtext="Loading"
  hovercrud=false;
  hoverread=false;
  constructor(private route:Router,private loginauth:LoginauthService) {

   }

  ngOnInit(): void {

  }

  gotoemployeecrud(){
    this.loading=true;
    this.startload();
    this.route.navigate(["employeecrud"]);

  }

  gotoread(){
    this.loading=true;
    this.startload();
    this.route.navigate(["employeeread"]);
  }

startload(){
  this.loadtext=this.loadtext+".";
for (let i=0;i<4;i++){
  setTimeout(() => {
    this.loadtext=this.loadtext+"."

  }, 800*i);
}


}
toglleinread(){
    this.hoverread=!this.hoverread
}
toglleincrud(){
  this.hovercrud=!this.hovercrud
}

}
