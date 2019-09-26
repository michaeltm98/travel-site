import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BackgroundService } from 'src/app/shared/background.service';
import { DataStoreService } from 'src/app/shared/dataStore.service';
import { PlacesService } from 'src/app/services/places.service';
// import * as GoogleSearch from 'google-search';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  placeForm;
  defaultImageUrl: string = "https://www.steppingstonetheatre.org/wp-content/plugins/post-grid/assets/frontend/css/images/placeholder.png";
  imageUrl: string = "https://www.steppingstonetheatre.org/wp-content/plugins/post-grid/assets/frontend/css/images/placeholder.png";
  
  constructor(private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private backgroundService: BackgroundService,
    private dataStoreService: DataStoreService,
    private placeService: PlacesService) { }

  ngOnInit() {
    this.imageUrl = this.defaultImageUrl;

    //in order to change the background from a child component, we'll need to make a shared service that emits an event

    this.placeForm = this.formBuilder.group({
      name: '',
      description: '',
      image: ''
    });
  }
  
  updateImageUrl(event) {

    if (event == '' || !event) {
      return;
  }
    this.imageUrl = event;
    this.backgroundService.setStaticImage(event);
  }

  onSubmit(event) {
    this.placeService.postPlace(this.placeForm.value).subscribe((data) => {
      console.log(data);
      this.dataStoreService.refreshPlaces();
    },
    error => {
      console.log(error);
    });
  }

  resetImage() {
    this.imageUrl = this.defaultImageUrl;
  }


}
