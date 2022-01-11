import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { employeemodel } from "../model/empmodel";
@Injectable()
export class Httpinterceptor implements HttpInterceptor{
  contentType:any=""
  constructor(private route:Router) {
   // alert ("http inter constructor");
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //  alert(req.method);

    if (req.headers.has('Content-Type'))
    this.contentType = req.headers.get('Content-Type');

    const clonereq= req.clone(
      {


        setHeaders:{
          Authorization:"Token TempToken",
          ContentType: (this.contentType != 'application/json' ? 'application/text' :
           this.contentType),
           userdata:"gobi"
        }
      }
    )
    /*alert(clonereq.url);
    alert(clonereq.headers.get("Authorization"));
    alert(clonereq.headers.get("ContentType"));
    alert(clonereq.method)
    alert(clonereq.urlWithParams)*/

   return  next.handle(clonereq).pipe(
     catchError((error:HttpErrorResponse)=>{
//alert("intercept="+error.status)
//return error.status;
this.route.navigate(["error",{"statuscode":error.status}])
         return throwError(error);
     })
   )



    }
  }

@Injectable()
export class Httpinterceptor2 implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const clonereq1= req.clone(
      {
        setHeaders:{
          Authorization:"Token TempToken2",
           userdata:"kris"
        }}
        )

        return next.handle(clonereq1);
      }
}


