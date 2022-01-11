import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { LoginauthService } from '../services/loginauth.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css'],
  animations: [
    trigger('hovermenu', [
      // ...
      state('onhoverenable', style({


        backgroundColor: 'green',
        color:"black"
      })),

      state('intial', style({

      })),
      state('onhoverdisenable', style({
             backgroundColor:'null'
      })),
      transition('onhoverenable <=> intial', [
        animate('0.5s')
      ]),
         ]),
  ]
})

export class LoginpageComponent implements OnInit {

  constructor(private loginauth: LoginauthService,private route:Router,private appcomp:AppComponent) { }
  username:string="";
  password:any;
  loginerror:any;
  ishover=false;
  ngOnInit(): void {
  }
  login(){
    let user= this.username.toUpperCase();

  if (this.loginauth.validateuser(user,this.password))
   {
    this.loginauth.setusername(this.username);
     this.route.navigate(["home"]);
     this.loginerror="";
     this.loginauth.setisloggedin(true);
     this.appcomp.getloggedinsttus();
   }
   else

    this.loginerror="Invalid username and password";
  }

  hover(){
    this.ishover=true;
  }

  hleave(){
    this.ishover=false;
  }
   getstate(){

    if (this.ishover)
    {
      if (this.username!="" && this.password!="")
      return 'onhoverenable';
      else
       return 'onhoverdisenable';
    }
    else
     return 'intial';
  }
}
