import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { CognitoService } from 'src/app/shared/cognito.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  newUserForm: FormGroup;
  constructor(private formBuilder: FormBuilder, 
    private cognitoService: CognitoService) { }

  ngOnInit() {
    this.newUserForm = this.formBuilder.group({
      email: '',
      username: '',
      password: '',
    })
  }

  signup() {
    console.log(this.newUserForm.value);
    this.cognitoService.signup(this.newUserForm.value);
  }

}
