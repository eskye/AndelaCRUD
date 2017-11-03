import { Student } from './../Student';
import { StudentService } from './../student.service';
import { Component, OnInit,ElementRef,Input,OnDestroy } from '@angular/core';

import {FlashMessagesService} from "angular2-flash-messages/module";
import DateTimeFormat = Intl.DateTimeFormat;
import {Router} from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  students: Student[];
  student: Student;

  constructor(private service: StudentService, private route: Router, private flash: FlashMessagesService) {
    this.student = new Student();
  }

  ngOnInit() {
    this.getStudent();
  }

  addStudent(student) {
    const validate = this.service.validate(student);
    if (!validate) {
      this.flash.show('Please fill all the fields..', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    this.service.saveStudent(student).subscribe(res => {
      this.student = student;
      this.students.push(this.student);
      this.flash.show('Success', {cssClass: 'alert alert-success', timeout: 3000});

      this.clearFields(student);
      this.route.navigate(['/']);

    });
  }


  removeStudent(student) {
    const index = this.students.indexOf(student);
    alert(index);
    this.students.splice(index, 1);
    this.service.removeStudent(student._id).subscribe(res => {
      console.log(res);
      this.flash.show('Deleted Successfully', {cssClass: 'alert-success', timeout: 4000});
    });


  }


  private getStudent() {
    this.service.getStudents().subscribe(students => {
      this.students = students;
    });
  }

  private clearFields(student) {

    student.firstname = "";
      student.lastname = "";
     student.address = "";
      student.phone = "";
       student.gender = "";
       student.course = "";
       student.school = "";
        student.email = "";

  }
}
