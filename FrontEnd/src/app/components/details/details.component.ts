import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { student } from 'src/app/models/studentInfo';
import { StudentsService } from './../../services/students.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  Student =new student();
  constructor(private _studentsService:StudentsService , private _activatedRoute:ActivatedRoute) {//4
  }
  ngOnInit():void //5
  {
    this._activatedRoute.paramMap.subscribe(parms=>{

        this._studentsService.getStudentById(parms.get('id')).subscribe(
          studentData=>{ this.Student=studentData;
}
        ); //2 service
      }
    );
  }

  getFullName(student:student):string
  {
    return student.FirstName+" "+student.LastName;
  }



}
