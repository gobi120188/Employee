export  class employeemodel {

  id:number | any;
  empid:number | any;
  name:string | any;
  experience:number | any;
  skills:string[] |any;
  location:string | any;
  salary:number | any;

  constructor(id:any,empid:any,name:string,exp:number,skills:string[],location:string,salary:number)
  {
     this.id=id;
    this.empid=empid;
    this.name=name;
    this.experience=exp;
    this.skills=skills;
    this.location=location;
    this.salary=salary;

  }

}
