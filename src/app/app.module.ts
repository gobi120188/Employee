import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { EmployeepageComponent } from './employeepage/employeepage.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { EmployeeeditpageComponent } from './employeeeditpage/employeeeditpage.component';
import { ReademppageComponent } from './reademppage/reademppage.component';
import { Httpinterceptor, Httpinterceptor2 } from './services/HttpInterceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { resolveguard } from './routeguards/resolveguard';
import {MatTableModule} from '@angular/material/table';

const materailmodules=[MatSliderModule,MatToolbarModule,MatListModule,MatInputModule,MatIconModule,
  MatButtonModule,MatIconModule,MatTableModule]


@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    HomepageComponent,
    EmployeepageComponent,
    ErrorpageComponent,
    EmployeeeditpageComponent,
    ReademppageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    materailmodules

  ],
  providers: [resolveguard,{provide:HTTP_INTERCEPTORS,
    useClass:Httpinterceptor,
    multi:true

  },
  {provide:HTTP_INTERCEPTORS,
    useClass:Httpinterceptor2,
    multi:true

  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
