import { Component, OnInit } from '@angular/core';
import { PlacesService } from 'src/app/services/places.service';
import { DataStoreService } from 'src/app/shared/dataStore.service';
import { Observable, Subscription } from 'rxjs';
import { Place } from 'src/app/models/place.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // places$: Observable<Array<Place>> = new Observable<Array<Place>>();
  places;
  subscriptions: Array<Subscription> = [];
  
  
  constructor(private dataStoreService: DataStoreService,
    private http: HttpClient,
    private placeService: PlacesService) { }

  ngOnInit() {
    this.places = this.dataStoreService.getPlaces();
    this.subscriptions.push(this.dataStoreService.placesChanged.subscribe((places) => {
      this.places = places.slice();
    }));
  }

  catchDeadLink(place: Place) {
    place.image = "https://www.steppingstonetheatre.org/wp-content/plugins/post-grid/assets/frontend/css/images/placeholder.png";
    this.placeService.updatePlace(place).subscribe((data) => {
      console.log("Dead link removed");
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.map(s => s.unsubscribe())
  }
}
