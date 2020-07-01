import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Dishes } from './Dishes.module';
import { Router } from '@angular/router';
import { authService } from '../services/auth-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  loadedPosts: Dishes[] = [];
  showFiller = false;
  favoriteSeason: string;
  seasons: string[] = ['Chinese', 'Western', 'French', 'Nyonya'];
  autoCompleteInput: String;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  Image = 'http://relish.dyndns-remote.com/RelishBackend/';

  @ViewChild('search')
  public searchElementRef: ElementRef;


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private http: HttpClient,
    private router: Router,
    private authService: authService
  ) { }


  ngOnInit() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 20;
        });
      });
    });
    this.fetchData();
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }


  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  onFetchData() {
    this.fetchData();
  }

  private fetchData() {
    this.http.get('http://relish.dyndns-remote.com/RelishBackend/Stores.php')
    .pipe(
         map(responseData => {
           var i;
           var responseDataLength = Object.keys(responseData).length;
           const DishArray = [];
           for (i=0; i<responseDataLength; i++) {
             if (!responseData[i].ProfileImage) {
               responseData[i].ProfileImage = 'ProfileImage/Default.jpg'
             }
             if (!responseData[i].HomePic) {
               responseData[i].HomePic = 'HomeImage/Default.jpg';
             }
             DishArray.push(responseData[i]);
           }
           this.loadedPosts = DishArray;
         })
    )
    .subscribe(posts => {
      console.log(this.loadedPosts);
    })
  }

  viewStore(Store: Object) {
    console.log(Store["Vendor ID"])
    this.authService.changeStore(String(Store["Vendor ID"]))
    this.router.navigate(['Stores'])
  }

}
