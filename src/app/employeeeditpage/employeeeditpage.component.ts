import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ComponentFactoryResolver, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { catchError, delay, filter, take, throwError } from 'rxjs';
import { DbService } from '../services/db.service';
import { employeemodel } from '../model/empmodel';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employeeeditpage',
  templateUrl: './employeeeditpage.component.html',
  styleUrls: ['./employeeeditpage.component.css']
})
export class EmployeeeditpageComponent implements OnInit {
  @Input("formdata") formdata: employeemodel | any;
  @Input("action") action: string | any;
  @Input("AllEmpData") AllEmpData: employeemodel[] | any;
  @Output() newItemEvent = new EventEmitter<string>();
  @ViewChild('empid') empidref: ElementRef | any;
  formelementdata: employeemodel = {
    id: null, empid: undefined, name: null, location: null, experience: undefined, skills: null,
    salary: undefined
  };
  previousempdataall: employeemodel[] = [];
  previousempdata: employeemodel | any = {
    id: 0, empid: 0, name: "", location: "", experience: 0, skills: [],
    salary: 0
  };

  Isupdate = true;
  hideUpdate = true;
  hideAdd = true;
  empformupdate: FormGroup | any;
  empformadd: FormGroup | any;


  constructor(private dbservice: DbService) { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    this.loadform();
  }

  loadform() {


    if (this.action == "update") {
      this.hideUpdate = false;
      this.hideAdd = true;
      this.Isupdate = true;
      this.previousempdata.empid = this.formdata.empid;
      this.previousempdata.experience = this.formdata.experience;
      this.previousempdata.skills = this.formdata.skills;
      this.previousempdata.location = this.formdata.location;
      this.previousempdata.name = this.formdata.name;
      this.previousempdata.salary = this.formdata.salary;
      this.loadupdateform();
    }
    else if (this.action == "add") {
      this.hideUpdate = true;
      this.hideAdd = false;
      this.Isupdate = false;
      this.loadaddform();
    }



  }

  loadupdateform() {

    this.empformupdate = new FormGroup({
      empid: new FormControl({ value: this.formdata.empid, disabled: this.Isupdate },
        [Validators.required, Validators.minLength(2)]),
      name: new FormControl(this.formdata.name),
      experience: new FormControl(this.formdata.experience),
      skills: new FormControl(this.formdata.skills),
      location: new FormControl(this.formdata.location),
      salary: new FormControl(this.formdata.salary)
    });

    this.empformupdate.get('name').setValidators([Validators.required, Validators.minLength(2)]);
    this.empformupdate.get('experience').valueChanges.subscribe(
      (data: string | any) => {
        if (data != null && data != '')
          this.empformupdate.get('skills').setValidators([Validators.required])
      })

  }

  loadaddform() {


    this.empformadd = new FormGroup({
      empid: new FormControl({ value: null, disabled: false },
        [Validators.required, Validators.minLength(2)]),
      name: new FormControl(null),
      experience: new FormControl(null),
      skills: new FormControl(null),
      location: new FormControl( null ),
      salary: new FormControl(null)
    });
    this.empformadd.get('name').setValidators([Validators.required,Validators.minLength(2)]);
    this.empformadd.get('experience').valueChanges.subscribe(
      (data: string | any) => {
        if (data != null && data != '')
          this.empformadd.get('skills').setValidators([Validators.required])
      })
  }
  update() {

    if (this.formdata.empid != this.empformupdate.get("empid").value)
      alert("Employee id cannot be changed")
    else {
      if (this.previousempdata.name == this.empformupdate.get("name").value &&
        this.previousempdata.experience == this.empformupdate.get("experience").value &&
        this.previousempdata.skills == this.empformupdate.get("skills").value &&
        this.previousempdata.location == this.empformupdate.get("location").value &&
        this.previousempdata.salary == this.empformupdate.get("salary").value)
        alert("No changes made yet cannot perform update");
      else {
        this.formelementdata=new employeemodel(
          this.formdata.id,
          this.empformupdate.get("empid").value,
          this.empformupdate.get("name").value,
          this.empformupdate.get("experience").value,
          this.empformupdate.get("skills").value,
          this.empformupdate.get("location").value,
          this.empformupdate.get("salary").value
        );
        this.dbservice.editempdata(this.formdata.id, this.formelementdata);
        this.refresh(this.action);
      }
    }

  }

  AddEmp() {
      let empid: any = this.AllEmpData.find((x: { empid: number}) =>
       x.empid == this.empformadd.get("empid").value)?.empid;

      if (empid != undefined)
        alert("Emp id already exists");
      else {
       this.formelementdata.empid=this.empformadd.get("empid").value;
       this.formelementdata.name=this.empformadd.get("name").value;
       this.formelementdata.experience=this.empformadd.get("experience").value;
       this.formelementdata.skills=this.empformadd.get("skills").value;
       this.formelementdata.location=this.empformadd.get("location").value;
       this.formelementdata.salary=this.empformadd.get("salary").value;

        this.dbservice.Addemployee(this.formelementdata);
        this.refresh(this.action);

      }


  }

  refresh(action: string) {
    this.newItemEvent.emit(this.formelementdata.empid + ";" + action);
  }

  close() {
    this.newItemEvent.emit("close");


  }

}
