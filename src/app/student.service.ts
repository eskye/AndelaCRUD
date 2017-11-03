import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Observable} from "rxjs";

@Injectable()
export class StudentService {
//url:string = "https://nodeandela.herokuapp.com/api/student";
url:string = "/api/students";

  constructor(private http: Http) {}

validate(student) {
   if (student.firstname === undefined || student.lastname === undefined || student.address === undefined || student.course==undefined){
     return false;
   }else {
     return true;
   }
}
  getStudents() {
    return this.http.get(this.url)
         .map(res => res.json())
      .catch(this._errorHandler);
  }

  saveStudent(students) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url, JSON.stringify(students), {headers: headers}).map(res => res.ok)
      .catch(this._errorHandler);
  }

  removeStudent(id) {
    return this.http.delete(this.url + "/" + id).map(res => res.json())
      .catch(this._errorHandler);
  }
  updateStudent(student) {
   const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const id = student._id;
    return this.http.put(this.url + "/" + id, JSON.stringify(student), {headers: headers}).map(res => res.json())
      .catch(this._errorHandler);
  }

  getById(id) {
    return this.http.get(`${this.url}/${id}`).map(res => res.json()).catch(this._errorHandler);
  }

  private _errorHandler(error: Response) {
    console.error("Error occurred" + error);
    console.error("Unexpected Error Occurred" + error);
    return Observable.throw(error || 'Unexpected error occurred');
  }

}
