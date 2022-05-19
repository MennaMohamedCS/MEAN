import { student } from '../../models/studentInfo';
import { Component, OnInit } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import { StudentsService } from '../../services/students.service';


@Component({
  selector: 'app-students',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})

export class StudentComponent  {

  students: student[] = [];

  constructor(private _studentsService:StudentsService , private _router:Router) {//2
  }
  ngOnInit():void
  {
    this._studentsService.getStudents().subscribe(
      studentsData=>{
        this.students=studentsData;
      }
    ); //2 service

  }
/*************************************************************************************** */

  updateAge(student:student):void{

    this._studentsService.updateStudent(student);
  }
/*************************************************************************************** */

  delete(index:number ,id:string):void
  {
    if( this._studentsService.deleteStudent(id) )
    {
      this.students.splice(index,1);
      alert("Done");
    }
    else{
      alert("error");
    }
}


/*************************************************************************************** */

  getSortStudents():student[]
  {
    this.students.sort((student1,student2)=>student1.Age-student2.Age)
    return this.students;
  }

/*************************************************************************************** */

  goToDetailsStudent(Student :student):void
  {
    this._router.navigate(["/details/",Student._id]); //3
  }
/*************************************************************************************** */

  getFullName(student:student):string
  {
    return student.FirstName+" "+student.LastName;
  }

}

