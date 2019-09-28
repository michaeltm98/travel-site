import { Component, OnInit } from '@angular/core';
import { DataStoreService } from 'src/app/shared/dataStore.service';
import { CognitoService } from 'src/app/shared/cognito.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  user: User;
  constructor(private dataStoreService: DataStoreService, 
    private cognitoService: CognitoService) { }

  ngOnInit() {
    this.user = this.dataStoreService.getUser();
  }

  logout(): void {
    this.cognitoService.logout();
  }

}
