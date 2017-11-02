import { AppRoutes } from './app.routing';

import { StudentService } from './student.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {FlashMessagesModule} from "angular2-flash-messages/module";
import { StudentComponent } from './student/student.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutes,
    FlashMessagesModule


  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
