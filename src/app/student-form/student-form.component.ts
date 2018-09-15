import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { nameValidator, alphaNumericValidator } from "./student.validators";

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent {

  studentForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) { 
    this.studentForm = this.formBuilder.group({
      name : ['', Validators.compose([nameValidator,  Validators.maxLength(20), Validators.required])],//[null, Validators.required],
      lastName : ['', Validators.compose([nameValidator,  Validators.maxLength(20), Validators.required])],
      year : ['', Validators.compose([Validators.required, Validators.min(1800), Validators.max(2017)])],
      class : ['', Validators.compose([alphaNumericValidator, Validators.required])],
      percentage : ['', Validators.required],
    });
  }

  onFormSubmit(form:NgForm) {
    console.log(this.studentForm.value);
    this.router.navigate(['/studentList']);
  }

  onCancelForm(eve:Event) {
    this.router.navigate(['/studentList']);
  }

}
