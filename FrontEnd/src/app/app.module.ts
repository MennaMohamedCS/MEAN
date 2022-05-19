import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentComponent } from './components/students/student.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CreatComponent } from './components/creat/creat.component';
import { DetailsComponent } from './components/details/details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { MaxLengthPipe } from './pipes/max-length.pipe';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    NavigationComponent,
    CreatComponent,
    DetailsComponent,
    NotFoundComponent,
    HomeComponent,
    MaxLengthPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
