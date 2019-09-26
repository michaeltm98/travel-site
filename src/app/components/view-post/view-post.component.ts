import { Component, OnInit } from '@angular/core';
import { Place } from 'src/app/models/place.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PlacesService } from 'src/app/services/places.service';
import { DataStoreService } from 'src/app/shared/dataStore.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  id: string;
  place: Place;

  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private dataStoreService: DataStoreService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.place = this.dataStoreService.getPlaceById(this.id);
    })

    this.dataStoreService.placesChanged.subscribe((places: Array<Place>) => {
      this.place = places.find(p => p.placeId == this.id);
    })
  }

}
