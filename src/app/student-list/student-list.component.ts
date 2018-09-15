import { studentListModel } from './student-list.model';
import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { StudentListService } from './student-list.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})

export class StudentListComponent implements OnInit {

  studentList:any;
  dataSource = new BookDataSource(this.api);
  displayedColumns = ['name', 'rollNumber', "totalMarks", "status"];

  constructor(private api: StudentListService) { }

  ngOnInit() {
    this.api.getStrudentsList()
      .subscribe(res => {
        console.log(res);
        this.studentList = res;
      }, err => {
        console.log(err);
      });
  }
}

export class BookDataSource extends DataSource<any> {
  constructor(private api: StudentListService) {
    super()
  }

  connect() {
    return this.api.getStrudentsList();
  }

  disconnect() {
  }
}
