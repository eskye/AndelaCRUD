import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StudentService} from "../student.service";
import {Student} from "../Student";
import {FlashMessagesService} from "angular2-flash-messages/module";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  student: Student;
  constructor(private route: ActivatedRoute, private rout: Router, private service: StudentService) {
    this.student = new Student();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
       this.service.getById(id).subscribe(student => {
          this.student = student;
       });
    });
  }

  updateStudent() {
    this.service.updateStudent(this.student).subscribe(res => {
      this.rout.navigate(['/']);
    });

  }

}
