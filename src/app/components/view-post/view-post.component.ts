import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from 'src/app/models/place.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PlacesService } from 'src/app/services/places.service';
import { DataStoreService } from 'src/app/shared/dataStore.service';
import { User } from 'src/app/models/user.model';
import { BackgroundService } from 'src/app/shared/background.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit, OnDestroy {
  id: string;
  place: Place;
  user: User;
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private dataStoreService: DataStoreService,
    private backgroundService: BackgroundService) { }

  ngOnInit() {
    this.user = this.dataStoreService.getUser();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.place = this.dataStoreService.getPlaceById(this.id);
    })

    this.dataStoreService.placesChanged.subscribe((places: Array<Place>) => {
      this.place = places.find(p => p.placeId == this.id);
    })
    this.updateImageUrl(this.place.image);
  }

  updateImageUrl(event) {

    if (event == '' || !event) {
      return;
  }
    this.backgroundService.setStaticImage(event);
  }

  ngOnDestroy() {
    this.backgroundService.enableDynamicImages();
  }

}
