import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the GeolocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-geolocation',
  templateUrl: 'geolocation.html',
})
export class GeolocationPage {
  coordinates: Object = { latitude: null, longitude: null, altitude: null, accuracy: null, altitudeAccuracy: null, speed: null, heading: null }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation
  ) {
    this.getGeolocation();
  }

  getGeolocation() {
    var options = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: false };
    this.geolocation.getCurrentPosition(options).then((resp) => {
      this.coordinates = { latitude: resp.coords.latitude, longitude: resp.coords.longitude, altitude: resp.coords.altitude, accuracy: resp.coords.accuracy, altitudeAccuracy: resp.coords.altitudeAccuracy, speed: resp.coords.speed, heading: resp.coords.heading }
      console.log(this.coordinates)
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GeolocationPage');
  }

}
