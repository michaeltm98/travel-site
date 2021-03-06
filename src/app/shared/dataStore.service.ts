import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Place } from '../models/place.model';
import { HttpClient } from '@angular/common/http';
import { PlacesService } from '../services/places.service';
import { User } from '../models/user.model';
import { CognitoUser } from 'amazon-cognito-identity-js';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  constructor(private placeService: PlacesService) { }
  placesChanged: Subject<any> = new Subject<Array<Place>>();
  places: Array<Place>;
  user: User = new User;
  userChanged: Subject<any> = new Subject<User>();

  getPlaces(): Array<Place> {
    if (this.places) {
      return this.places;
    }
    else {
       return [];
    }
  }

  getPlaceById(id: string): Place {
    if (this.places) {
      return this.places.find(p => p.placeId == id);
    }
    else {
       return new Place();
    }
  }

  setPlaces(places: Array<Place>): void {
      this.places = places.slice();
      this.placesChanged.next(places)
  }

  refreshPlaces(): void {
    this.placeService.getPlaces(this.user).subscribe((places) => {
        this.setPlaces(places);
        console.log("Places refreshed")
    })
  }

  getUser(): User {
    return this.user;
  }

  setUser(user: User) {
    this.user = user;
    this.userChanged.next(user);
    this.refreshPlaces();
  }




}
