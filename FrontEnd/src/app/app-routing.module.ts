import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DetailsComponent } from './components/details/details.component';
import { CreatComponent } from './components/creat/creat.component';
import { StudentComponent } from './components/students/student.component';


import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {path:'creat',component:CreatComponent},
  {path:'allStudent',component:StudentComponent},
  {path:'details/:id',component:DetailsComponent},
  {path:'details',component:DetailsComponent},
  {path:'',component:HomeComponent},
  {path:'**', component:NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
