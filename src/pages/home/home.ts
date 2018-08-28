import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataLocal } from '../../models/data_local';
import { MainProvider } from '../../providers/main/main';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isGPS: any = false;
  isWeather: any = false;
  isError: any = false;


  constructor(
    public navCtrl: NavController,
    public mainProvider: MainProvider,
  ) {

  }

  ionViewDidLoad() {
    this.mainProvider.feedbackGeoLocation.subscribe(data => {
      if (data) {
        this.isGPS = true;
        console.log("GPS", this.isGPS)
      } else {
        this.isGPS = "error"
      }
    })
    this.mainProvider.feedbackWeather.subscribe(data => {
      if (data) {
        this.isWeather = true;
        console.log("GPS", this.isGPS)
      } else {
        this.isWeather = "error";
      }
    })
    this.mainProvider.getGeolocation();
  }
}
