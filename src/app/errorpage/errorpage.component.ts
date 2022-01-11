import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-errorpage',
  templateUrl: './errorpage.component.html',
  styleUrls: ['./errorpage.component.css']
})
export class ErrorpageComponent implements OnInit {
errortext:string="An internal error has been occured";
  constructor(private activeroute:ActivatedRoute) { }

  ngOnInit(): void {
  let statuscode=this.activeroute.snapshot.params["statuscode"];
  if (statuscode==0)
   this.errortext="Client side error has been occured";
   if (statuscode==404)
   this.errortext="404 Server not found error occured";
   if (statuscode==500)
   this.errortext="Internal server error occured";


  }

}
