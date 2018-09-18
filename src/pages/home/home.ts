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
  irrigar: any;
  cultura: any;
  areaPlantada: any;


  constructor(
    public navCtrl: NavController,
    public mainProvider: MainProvider,
  ) {
    
  }

  ionViewDidLoad() {
    console.log("home")
    this.mainProvider.getGeolocation();
    this.mainProvider.feedbackGeoLocation.subscribe(data => {
      if (data) {
        this.isGPS = true;
        // console.log("GPS", this.isGPS)
      } else {
        this.isGPS = "error"
      }
    })
    this.mainProvider.feedbackWeather.subscribe(data => {
      if (data) {
        this.isWeather = true;
        // console.log("GPS", this.isGPS)
      } else {
        this.isWeather = "error";
      }
    })
    this.mainProvider.feedbackEvapotranspiracao.subscribe((data) => {
      this.irrigar = this.mainProvider.evapotranspiracao.evapotranspiracaoCulturaDia * this.mainProvider.local.areaPlantada;
      this.irrigar = this.irrigar.toFixed(0);
      this.cultura = this.mainProvider.local.coeficienteCulturaNome;
      this.areaPlantada = this.mainProvider.local.areaPlantada;
      console.log(this.irrigar)
    })
  }
}
