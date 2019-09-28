import { Component, OnInit } from '@angular/core';
import { DataStoreService } from 'src/app/shared/dataStore.service';
import { CognitoService } from 'src/app/shared/cognito.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( 
    private cognitoService: CognitoService,
    private dataStoreService: DataStoreService) { }

  ngOnInit() {
  }

  logout() {
    console.log("logout");
    this.cognitoService.logout();
  }

}
