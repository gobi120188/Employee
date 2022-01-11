import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginauthService } from './services/loginauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'EmployeePortal';
  isloggedin: boolean = false;
  username="";


  constructor(private loginauth:LoginauthService,private route:Router){
this.isloggedin=this.loginauth.isloggedin;

 }

  gotohome(){
    if (this.route.url=="/home")
     alert("Already in home page")
     else
   this.route.navigate(["home"]);
  }
  gotoemployee(){
    this.route.navigate(["employee"]);
  }
  getloggedinsttus(){
  this.isloggedin=this.loginauth.getisloggedin();
  this.username=this.loginauth.getusername();
}
gotologout(){
  this.loginauth.setisloggedin(false);
 this.isloggedin=false;
 this.route.navigate(["login"])
}

}
