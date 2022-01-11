import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeepageComponent } from './employeepage/employeepage.component';
import { EmployeepageguardGuard } from './routeguards/employeepageguard.guard';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { ReademppageComponent } from './reademppage/reademppage.component';
import { HomepageGuard } from './routeguards/homepage.guard';
import {resolveguard} from './routeguards/resolveguard'


const routes: Routes = [
  {path:'',component:LoginpageComponent
  },
  {path:'login',component:LoginpageComponent
  },
  {path:"home",component:HomepageComponent,canActivate:[HomepageGuard]},
  {path:"employeecrud",component:EmployeepageComponent
  ,canActivate:[EmployeepageguardGuard]
    ,resolve:{empdata:resolveguard}
},
  {path:"employeeread",component:ReademppageComponent,canActivate:[HomepageGuard],resolve:{data:resolveguard}},
  {path:"error/:statuscode",component:ErrorpageComponent,canActivate:[HomepageGuard]},
  {path:"**",component:ErrorpageComponent,canActivate:[HomepageGuard]}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
