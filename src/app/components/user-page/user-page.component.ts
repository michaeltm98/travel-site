import { Component, OnInit } from '@angular/core';
import { DataStoreService } from 'src/app/shared/dataStore.service';
import { CognitoService } from 'src/app/shared/cognito.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  constructor(private dataStoreService: DataStoreService, 
    private cognitoService: CognitoService) { }

  ngOnInit() {
  }

  logout(): void {
    this.cognitoService.logout();
  }

}
