import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { student } from 'src/app/models/studentInfo';
import { StudentsService } from './../../services/students.service';

@Component({
  selector: 'app-creat',
  templateUrl: './creat.component.html',
  styleUrls: ['./creat.component.css']
})
export class CreatComponent implements OnInit {

  students: student[] = [];
  creatForm:FormGroup = new FormGroup({});

  constructor(private _studentsService:StudentsService, private _formBuilder:FormBuilder) {  //1 service injectable
  }
  ngOnInit():void
  {
    this._studentsService.getStudents().subscribe(
      studentsData=>{
        this.students=studentsData;
      }
    ); //2 service

    this.creatForm=this._formBuilder.group({
      FirstName:["",[Validators.required]],
      LastName:["",[Validators.required]],
      Email:["",[Validators.required, Validators.email]],
      Mobile:["",[Validators.required, Validators.pattern('^01[0125][0-9]{8}$')]],
      NationalID:["",[Validators.required, Validators.pattern('^[0-9]*$'),Validators.minLength(14), Validators.maxLength(14)]],
      Age:[,[Validators.required]],

    })
  }
/**********************************************************************************/
  add(FirstName: string, LastName: string, Mobile: string, Email: string, NationalID: string ,Age: number): void
  {
    console.log(this.isExistStudent(NationalID));
    if(NationalID.length==14)
    {
      if(!this.isExistStudent(NationalID))
      {
        let Student =new student();
        Student.FirstName=FirstName;
        Student.LastName=LastName;
        Student.Mobile=Mobile;
        Student.Email=Email;
        Student.NationalID=NationalID;
        Student.Age=Age;

        this._studentsService.postStudent(Student,this.students); //2 service
      }
    }
    else
    {
      alert("please, Enter 14 numbers in National ID");
    }
  }
/**********************************************************************************/
  getStudentNumber():number
  {
    return this.students.length;
  }

/**********************************************************************************/

  isExistStudent(NationalID:string):boolean
  {
    return this.students.some(student =>{
      return student.NationalID==NationalID
    });
  }

}
