import { Component, Inject } from '@angular/core';
import { element } from 'protractor';
import { PlacesService } from './services/places.service';
import { Place } from './models/place.model';
import { DataStoreService } from './shared/dataStore.service';
import { Subject, Observable, of } from 'rxjs';
import { BackgroundService } from './shared/background.service';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'travel-site';

  places$: Observable<Array<Place>> = new Observable<Array<Place>>();

  constructor(private dataStoreService: DataStoreService,
    private backgroundService: BackgroundService) { }

  ngOnInit() {
    this.dataStoreService.refreshPlaces();
    this.places$ = this.dataStoreService.placesChanged;

  }


  
  getBackgroundStyle(place, index) {
      return this.backgroundService.getBackgroundStyle(place, index);
  }

  initCognito() {

  }




}
