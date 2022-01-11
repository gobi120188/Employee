import { query } from '@angular/animations';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { catchError, Observable, of, retry, throwError } from 'rxjs';

import { empinter } from '../model/empinterface';
import { employeemodel } from '../model/empmodel';



@Injectable({
  providedIn: 'root',
})
export class DbService {
  url = 'http://localhost:3000/employees';
  constructor(private httpClient: HttpClient,private route:Router) {}
empdata:employeemodel[] | any=[]


parameters={empid:2,name:"Siva"}
//,{empid:1}]
getempdatabyresolve():employeemodel[] | any{
  return  this.httpClient
      .get<employeemodel[]>(this.url,
        {
      //  params:new HttpParams().set('name',"Siva").set("empid",2)
         //params:this.parameters

      //  :new URLSearchParams().set('name','Siva')



        })
}

setempdata(){
  this.httpClient.get<employeemodel[]>(this.url).subscribe(val=>{this.empdata=val;});

  return;
}

getempdata(){

  return this.empdata;
}

  editempdata(id: number, payload: employeemodel) {
    this.httpClient
      .put(this.url + "/"+ id, payload)
      .pipe(catchError(this.handleError))
      .subscribe((msg) => msg);

  }



  Addemployee(dbfile:employeemodel){
    this.httpClient
      .post(this.url,dbfile)
      .pipe(catchError(this.handleError))
      .subscribe((msg) => msg);
  }

  deleteemp(id:string)
  {


    this.httpClient.delete(this.url+"/"+id).subscribe(msg=>console.log(msg));


  }

   handleError(error1: HttpErrorResponse) {
 return of(error1.status);

  }


}
