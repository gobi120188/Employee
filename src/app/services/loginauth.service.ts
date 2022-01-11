import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginauthService {
  username:string="";
  constructor() { }
isloggedin:boolean=false;
  validateuser(name:string | any,password:string){

    if (name =="GOBI" && password=="1234")
     return 1;
     else
     return 0;
  }
  getisloggedin(){
    return this.isloggedin;
  }
  setisloggedin(login_status:boolean){
    this.isloggedin=login_status;
  }
  setusername(username:string){
    this.username=username;

  }
  getusername(){
    return this.username;

  }
}
