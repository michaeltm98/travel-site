import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Place } from '../models/place.model';
import { HttpClient } from '@angular/common/http';
import { PlacesService } from '../services/places.service';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  constructor(private placeService: PlacesService) { }
  placesChanged: Subject<any> = new Subject<Array<Place>>();
  places: Array<Place>;

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
    this.placeService.getPlaces().subscribe((places) => {
        this.setPlaces(places);
        console.log("Places refreshed")
    })
  }





}
