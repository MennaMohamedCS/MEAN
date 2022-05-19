import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { student } from './../models/studentInfo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private _httpClient:HttpClient) { }

  getStudents():Observable<student[]> {

    return this._httpClient.get<student[]>("http://localhost:4000/api/students/");
  }


  postStudent(Student:student , students:student[]) :any{
    this._httpClient.post('http://localhost:4000/api/students/',Student).subscribe(
        (response:any)=>{
          students.push(Student);
        },
        (error:any)=>{
          alert("Error");
        }
      );
  }

  updateStudent(student:student): void{

    this._httpClient.put(`http://localhost:4000/api/students/${student._id}`,student).subscribe(
      (response:any)=>{ alert("Done"); },
      (error:any)=>{ alert("Error"); }
    )

  }

  deleteStudent(ID:string) :boolean{

    this._httpClient.delete(`http://localhost:4000/api/students/${ID}`).subscribe(
      (response:any)=>{
        return true;
      },
      (error:any)=>{return false;}
  )
  return true;
  }

  getStudentById(ID:any) : Observable<student>{

    return this._httpClient.get<student>(`http://localhost:4000/api/students/${ID}`)
  }
}
