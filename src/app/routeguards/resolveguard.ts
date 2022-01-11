import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DbService } from "../services/db.service";

@Injectable()
export class resolveguard implements Resolve<any>{
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.dbservice.getempdatabyresolve()
  }
  constructor(private dbservice:DbService){

  }

}
