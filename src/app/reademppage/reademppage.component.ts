import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { employeemodel } from '../model/empmodel';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-reademppage',
  templateUrl: './reademppage.component.html',
  styleUrls: ['./reademppage.component.css']
})
export class ReademppageComponent implements OnInit {
  empdata: employeemodel[] = [];
  tempempdata: employeemodel[] = [];

  start = 0;
  end = 11;
  count = 1;
  currentpage = 1;
  rowperpage=10;


  constructor(private dbservice:DbService,private activeroute:ActivatedRoute) {
   }

  ngOnInit(): void {
    this.empdata=this.activeroute.snapshot.data["data"]
     for (let emp of this.empdata){
        this.tempempdata.push(emp);
     }
   }

  setpage(pagenum: number) {
    if (this.currentpage != pagenum) {
      if (pagenum == 1) {
        this.currentpage = 1;
        this.start = 0;
        this.end = this.rowperpage;
      }
      else {
        this.start = (pagenum * this.rowperpage) - this.rowperpage;
        this.end = (pagenum * this.rowperpage);
        this.currentpage = pagenum;
      }
    }

  }

  getstlye(pagenum:number){

    if (pagenum==this.currentpage){

      return {

        "background-color": "green"

      }
    }
    else
     return {
      "background-color": "tomato"

     }

    }

    SortByEmpID(){

      this.empdata.sort((a:employeemodel,b:employeemodel)=>a.empid - b.empid)


    }
    SortByEmpName(){

      this.empdata.sort
       (
         (a:employeemodel,b:employeemodel)=>
            {
              if (a.name < b.name)
               return -1
              if (a.name > b.name)
                return 1
               return 0
            }
       )

    }

    RemoveSort(){
      this.empdata=[]
      for (let temp of this.tempempdata){
        this.empdata.push(temp)
      }




    }
}
