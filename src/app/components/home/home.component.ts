import { Component, OnInit } from '@angular/core';
import { PlacesService } from 'src/app/services/places.service';
import { DataStoreService } from 'src/app/shared/dataStore.service';
import { Observable, Subscription } from 'rxjs';
import { Place } from 'src/app/models/place.model';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // places$: Observable<Array<Place>> = new Observable<Array<Place>>();
  user: User;
  places;
  subscriptions: Array<Subscription> = [];
  
  
  constructor(private dataStoreService: DataStoreService,
    private http: HttpClient,
    private placeService: PlacesService) { }

  ngOnInit() {
    this.places = this.dataStoreService.getPlaces().sort((a, b) => (b.rating - a.rating));
    this.user = this.dataStoreService.getUser();
    this.subscriptions.push(this.dataStoreService.placesChanged.subscribe((places) => {
      this.places = places.slice().sort((a, b) => (b.rating - a.rating))
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

  updateRating(newRating: number, place: Place) {
    console.log(newRating, place);
    place.rating = newRating;
    this.placeService.updatePlace(place).subscribe((data) => {
      console.log("Rating updated");
    })
  }
}
