import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginauthService } from '../services/loginauth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeepageguardGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> |
    boolean | UrlTree {

      if (this.loginauth.isloggedin )
        return true;
        else
         this.route.navigate(["login"]);
         return true;
  }
  constructor(private loginauth:LoginauthService,private route:Router){

  }

}
