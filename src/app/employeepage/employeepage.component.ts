import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { catchError, observable, Observable, of, ReplaySubject } from 'rxjs';
import { DbService } from '../services/db.service';
import { employeemodel } from '../model/empmodel';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';





@Component({
  selector: 'app-employeepage',
  templateUrl: './employeepage.component.html',
  styleUrls: ['./employeepage.component.css']
})
export class EmployeepageComponent implements OnInit {

  loadformcomp = false;
  action:string="";
  rowperpage=7;
  empdata: employeemodel[] = [];
  screenempdata: employeemodel[] = [];
  displaydata: employeemodel[] | any = [];
  tempempdata: employeemodel[] = [];
  renderdatainchild: employeemodel = { id: 0, empid: 0, name: "", experience: 0, skills: [], location: "", salary: 0 };
  start = 0;
  end = this.rowperpage;
  count = 1;
  currentpage = 1;
  currentempinedit=-1;
  sort="SortByEmpID";
  previousid=-1
  datasource:any;
  displayedColumns: string[] = ['empid', 'name','experience','skills', 'location','salary','delete','edit'];
  dbcolumns:string[]=['empid', 'name','experience','skills', 'location','salary']
  screenindex=0;
  constructor(private dbservice: DbService, private httpClient: HttpClient,private route:Router
     ,private activeroute:ActivatedRoute) {

  }
  ngOnInit(): void {
    this.empdata=this.activeroute.snapshot.data["empdata"];
    this.loaddata();
   let dataToDisplay = [...this.screenempdata];

  this.displaydata = new ExampleDataSource(dataToDisplay);
  //let pagenum= this.activeroute.snapshot.params["pagenum"]
  //this.Navpage(pagenum);

  }
/*Nav pages*/
  Navpage(pagenumtonav: number) {

    if (this.currentpage != pagenumtonav) {
      if (pagenumtonav == 1) {
        this.currentpage = 1;
        this.start = 0;
        this.end = this.rowperpage;
      }
      else {
        this.start = (pagenumtonav * this.rowperpage) - this.rowperpage;
        this.end = (pagenumtonav * this.rowperpage);
        this.currentpage = pagenumtonav;
      }
      this.loaddata();

    }


  }

  loadupdateform(eid: number, name: string) {

    let findbyempid = this.empdata.find(x => ((x.empid == eid && x.name == name)));

    if (this.currentempinedit!=findbyempid?.empid)
    {
      this.renderdatainchild = new employeemodel(findbyempid?.id, findbyempid?.empid, findbyempid?.name,
        findbyempid?.experience, findbyempid?.skills, findbyempid?.location, findbyempid?.salary);
      this.currentempinedit=findbyempid?.empid;
      this.loadformcomp = true;
      this.action="update";
    }

  }


  loaddeleteform(eid: number, name: string) {

    let edata: any = this.empdata.find(x => ((x.empid == eid && x.name == name)));

    if (this.previousid!=edata?.id){
      this.previousid=edata?.id
      if (confirm("Are you Confirm to delete this row !")) {
        this.dbservice.deleteemp(edata?.id);
        this.refreshtable("delete;"+(edata?.empid));;
      }

    }

  }

  addnewemp() {
    this.renderdatainchild = new employeemodel(0, 0, "", 0, [], "", 0);
    this.loadformcomp = true;
    this.action="add"
  }


  refreshtable(msg: string) {

    var splitted = msg.split(";", 2);
    this.dbservice.setempdata();
   // this.dbservice.getempdatabyresolve().subscribe((val: employeemodel[]) => this.empdata = val)
    this.loadformcomp = false;
   //  this.empdata=[];
    // alert(this.empdata[0])

     //while(this.empdata.length==0)
     //{
      this.empdata=this.dbservice.getempdata();
    // }



    if (splitted[0]=="delete")
    {
      alert("processing delete request")


    }
    else if (splitted[1] == "add")
    {

      alert("Processing your request");

    }
      else if (splitted[1] == "update")
      {
       alert("processing update request")
        this.currentempinedit=-1;
      }
      setTimeout(() => {
        this.empdata=this.dbservice.getempdata();
        if (splitted[1] == "update")
        alert("Updated the data for Employee id:" + splitted[0]);
        if (splitted[0] == "delete"){
          alert ("Deleted the employee data having employee id:"+splitted[1]);
          let num=(this.empdata.length) / this.rowperpage;
          let extra=(this.empdata.length) % this.rowperpage;
          if (extra==0)
           this.Navpage(Math.floor(num));
        }

        if (splitted[1]=="add")
        {
          alert("New Employee added with Employee id:" + splitted[0]);
          if ((this.empdata.length+1)<this.rowperpage)
          {
            this.Navpage(1);
          }
          else
          {
             let num=(this.empdata.length+1)/this.rowperpage;
             let extra=(this.empdata.length+1) % this.rowperpage;
             if (extra==0)
              this.Navpage(Math.floor(num));
             else
              this.Navpage((Math.floor(num)+1));
          }
        }

        this.loaddata();

      }, 1000);


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
    sortbyempid(){
      if (this.sort=="SortByEmpID"){
        this.tempempdata=this.empdata;
      this.empdata.sort(((a:employeemodel,b:employeemodel)=>a.empid - b.empid))
      this.sort="RemoveSort";
      }
      else{
        this.empdata.sort(((a:employeemodel,b:employeemodel)=>a.id - b.id))
        this.sort="SortByEmpID";
      }

      this.loaddata()

    }

     loaddata(){

      let  index= this.start;
      this.screenindex=0;
      var i=this.start;
      this.screenempdata=[];
      //alert(this.empdata.length)
        while (i<this.end && i<this.empdata.length)
       {
         i=i+1;
        this.screenempdata[this.screenindex]=this.empdata[index];
        this.screenindex=this.screenindex+1;
        index = index + 1;

       }

       let dataToDisplay = [...this.screenempdata];
       this.displaydata = new ExampleDataSource(dataToDisplay);
       this.displaydata.setData(dataToDisplay);

     }
  }



  class ExampleDataSource extends DataSource<employeemodel> {
    private _dataStream = new ReplaySubject<employeemodel[]>();

    constructor(initialData: employeemodel[]) {
      super();
      this.setData(initialData);
    }

    connect(): Observable<employeemodel[]> {
      return this._dataStream;
    }

    disconnect() {}

    setData(data: employeemodel[]) {
      this._dataStream.next(data);
    }
  }
