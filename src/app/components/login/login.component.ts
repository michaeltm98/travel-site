import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CognitoService } from 'src/app/shared/cognito.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private cognitoService: CognitoService ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: '',
      username: '',
      password: '',
    })

  }

  login(event) {
    event.srcElement.blur();
    event.preventDefault();
    event.stopPropagation();
    console.log(this.userForm.value);
    this.cognitoService.login(this.userForm.value);


  }


}
