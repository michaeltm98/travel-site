import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStoreService } from 'src/app/shared/dataStore.service';
import { CognitoService } from 'src/app/shared/cognito.service';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User;
  subscriptions: Array<Subscription> = [];

  constructor( 
    private cognitoService: CognitoService,
    private dataStoreService: DataStoreService,
    private router: Router) { }

  ngOnInit() {
    this.user = this.dataStoreService.getUser();
    this.subscriptions.push(this.dataStoreService.userChanged.subscribe((user: User) => {
      this.user = user;
    }))
    this.listenForNaviate();
  }

  logout() {
    console.log("logout");
    this.cognitoService.logout();
  }

  ngOnDestroy() {
    this.subscriptions.map(s => s.unsubscribe());
  }

  listenForNaviate() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        document.getElementById("navbarSupportedContent").classList.remove('show');
      }
    })
  }

}
