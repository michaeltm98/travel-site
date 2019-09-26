import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {
    blur: string = "8px";
    dynamicImages: boolean = true;
    imageUrl: string = '';
    defaultImage = "https://www.steppingstonetheatre.org/wp-content/plugins/post-grid/assets/frontend/css/images/placeholder.png";

  constructor(private http: HttpClient) { }
  
  setStaticImage(imageUrl: string): void {
      if (imageUrl == '' || !imageUrl) {
          this.dynamicImages = true;
          return;
      }
      this.http.get(imageUrl).subscribe(success => {
        this.imageUrl = imageUrl;
        this.dynamicImages = false;
      },
      error => {
          if (error) {
            if (error.status == 200 || error.status == 0) {
                this.imageUrl = imageUrl;
                this.dynamicImages = false;
              }
              else {
                console.log(error);
                this.dynamicImages = true;
    
              }
          }

      })

  }

  enableDynamicImages(): void {
      this.dynamicImages = true;
  }


  getBackgroundStyle(place, index): any {
      let url = "";
      if (!this.dynamicImages) {
        url = this.imageUrl;
      } 
      else {
        if (place.image != this.defaultImage) {
          url = place.image;
        } 
        else {
          url = '../assets/quito.jpg';
        }
      }
    return {
      "background-image": `url('${url}')`,
      "animation-delay":  index*10 + "s",
      "filter": `blur(${this.blur})`,
      "-webkit-filter": `blur(${this.blur})`,
    }
}





}
