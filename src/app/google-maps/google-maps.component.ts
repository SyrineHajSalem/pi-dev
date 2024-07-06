import { Component, AfterViewInit, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { RouteInfo } from './maps-route.model';
const propertyIcon = '../../assets/maps-property-location.svg';
const userLocationIcon = '../../assets/maps-my-location.svg';
declare const google: any;
@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements AfterViewInit {
   routeStyle = {
    strokeColor: '#4d5eba',
    strokeOpacity: 0.8,
    strokeWeight: 4
  } 
  constructor() { }
  @Output() routeInfoReady: EventEmitter<RouteInfo[]> = new EventEmitter<RouteInfo[]>();
  @Input() property: any;
  map: any;
  directionsService: any;
  googleMapsApiKey: string = 'AIzaSyAYhT5-YOk78TJsYnI-wDUEgC4hkPuqW3g'

  ngAfterViewInit(): void {
    this.initMap();
  }
  async initMap(): Promise<void> {
    const mapElement = document.getElementById('map');
    if (!mapElement) {
      console.error('Map element with ID "map" not found.');
      return;
    }
    console.log(this.property);

    // Initialize Google Map
    this.map = new google.maps.Map(mapElement, {
      center: { lat: this.property.coordinatesLat, lng: this.property.coordinatesLng }, // Default center coordinates for Tunisia
      zoom: 12
    });

    this.directionsService = new google.maps.DirectionsService();

    try {
      const location = { lat: this.property.coordinatesLat, lng: this.property.coordinatesLng};
      this.map.setCenter(location);
      this.addMarker(location, 'Property Location', propertyIcon);

      // Get current user's location and calculate routes
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          // const userLocation = {
          //   lat: position.coords.latitude,
          //   lng: position.coords.longitude
          // };
          const userLocation = {
            lat: 36.881070, 
            lng: 10.227742
          };
          this.addMarker(userLocation, 'Your Location', userLocationIcon);

          const transitInfo = await this.calculateAndDisplayRoute(userLocation, location, 'TRANSIT');
          const drivingInfo = await this.calculateAndDisplayRoute(userLocation, location, 'DRIVING');
          
          this.routeInfoReady.emit([transitInfo, drivingInfo]);
        }, error => {
          console.error('Error getting user location:', error);
        });
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }

  async geocode(address: string): Promise<any> {
    const geocoder = new google.maps.Geocoder();
    try {
      const results = await new Promise<any>((resolve, reject) => {
        geocoder.geocode({ address: address }, (results: any, status: any) => {
          if (status === 'OK' && results && results.length > 0) {
            resolve(results);
          } else {
            reject(`Geocode was not successful for the following reason: ${status}`);
          }
        });
      });
      return results[0].geometry.location;
    } catch (error) {
      console.error('Error geocoding location:', error);
      throw error;
    }
  }

  addMarker(position: any, title: string, iconSvg: string): void {
    new google.maps.Marker({
      position: position,
      map: this.map,
      title: title,
      icon: {
        url: iconSvg,
        scaledSize: new google.maps.Size(32, 32)
      }
    });
  }

  async calculateAndDisplayRoute(start: any, end: any, travelMode: any): Promise<RouteInfo> {
    const request = {
      origin: start,
      destination: end,
      travelMode: travelMode
    };

    return new Promise<RouteInfo>((resolve, reject) => {
      this.directionsService.route(request, (result: any, status: any) => {
        if (status == 'OK') {
          const directionsRenderer = new google.maps.DirectionsRenderer({
            map: this.map,
            suppressMarkers: true, // Suppress default markers
            polylineOptions: this.routeStyle
          });
          directionsRenderer.setDirections(result);

          const route = result.routes[0];
          const routeLeg = route.legs[0];
          const distance = routeLeg.distance.text;
          const duration = routeLeg.duration.text;

          const routeInfo: RouteInfo = {
            travelMode: travelMode,
            distance: distance,
            duration: duration
          };

          resolve(routeInfo);
        } else {
          console.error('Failed to display route:', status);
          reject(status);
        }
      });
    });
  }

}
