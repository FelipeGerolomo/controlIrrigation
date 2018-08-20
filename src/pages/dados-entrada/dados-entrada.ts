import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { DataLocal } from '../../models/data_local';
import { MainProvider } from '../../providers/main/main';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-dados-entrada',
  templateUrl: 'dados-entrada.html',
})
export class DadosEntradaPage {
  dadosEntrada: DataLocal = new DataLocal();
  listKC: any;

  isGPS: any = false;
  isWeather: any = false;
  isError: any = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mainProvider: MainProvider,
    public loadingCtrl: LoadingController,
    public events: Events
  ) {
    this.mainProvider.getGeolocation();
    // console.log("getLocation",this.mainProvider.getGeolocation())
  }

  // getGeolocation() {
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     console.log(resp.coords)
  //   }).catch((error) => {
  //     console.log('Error getting location', error);
  //   });

  //   let watch = this.geolocation.watchPosition();
  //   watch.subscribe((data) => {
  //     console.log(data.coords)
  //   });
  // }

  // save() {
  //   this.mainProvider.dadosEntrada = this.dadosEntrada;
  //   console.log(this.mainProvider.dadosEntrada)
  // }

  // getKC() {
  //   this.listKC = this.mainProvider.kc;
  //   // console.log(this.listKC)
  // }

  // onSetAltitude(value: string) {
  //   this.dadosEntrada.calcPatm();
  // }

  ionViewDidLoad() {
    this.mainProvider.feedbackGeoLocation.subscribe(data => {
      if(data) {
        this.isGPS = true;
      } else {
        this.isGPS = "error"
      }
    })
    this.mainProvider.feedbackWeather.subscribe(data => {
      if(data) {
        this.isWeather = true;
      } else {
        this.isWeather = "error";
      }
    })
    console.log('ionViewDidLoad DadosEntradaPage');
  }

}

