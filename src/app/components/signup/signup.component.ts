import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  newUserForm: FormGroup;
  constructor(private formBuilder: FormBuilder, ) { }

  ngOnInit() {
    this.newUserForm = this.formBuilder.group({
      email: '',
      username: '',
      password: '',
    })
  }

  signup() {
    console.log(this.newUserForm.value);
  }

}
