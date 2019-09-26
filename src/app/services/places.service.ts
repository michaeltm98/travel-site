import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Place } from '../models/place.model';
import { HttpClient } from '@angular/common/http';
import { DataStoreService } from '../shared/dataStore.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private http: HttpClient) { }
  places: Array<Place>;

  getPlaces(): Observable<Array<Place>> {
    return this.http.get<Array<Place>>('https://4x2wskv068.execute-api.us-east-1.amazonaws.com/DEV/place');
  }

  postPlace(place: Place): Observable<any> {
    return this.http.post('https://4x2wskv068.execute-api.us-east-1.amazonaws.com/DEV/place', JSON.stringify(place));
  }

  updatePlace(place: Place): Observable<any> {
    return this.http.put('https://4x2wskv068.execute-api.us-east-1.amazonaws.com/DEV/place', JSON.stringify(place));
  }
  
}
