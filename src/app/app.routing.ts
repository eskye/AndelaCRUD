import { HomeComponent } from './home/home.component';

import { AppComponent } from './app.component';
import { Component } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import {StudentComponent} from "./student/student.component";

const routes: Route[] = [

  {path: 'index', component: HomeComponent},
  {path:'student/:id',component:StudentComponent},
  {path: '**', component: HomeComponent  },
  {path: '', component: HomeComponent  }
];

export const AppRoutes = RouterModule.forRoot(routes);
