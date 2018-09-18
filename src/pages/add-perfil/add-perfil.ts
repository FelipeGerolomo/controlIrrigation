import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { DataLocal } from '../../models/data_local';
import { MainProvider } from '../../providers/main/main';
import { DadosEntradaPage } from '../dados-entrada/dados-entrada';


@IonicPage()
@Component({
  selector: 'page-add-perfil',
  templateUrl: 'add-perfil.html',
})
export class AddPerfilPage {
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
  }

  onChange(id) {
    for (let index = 0; index < this.mainProvider.kc.length; index++) {
      if (id == this.mainProvider.kc[index]["ID"]) {
        this.mainProvider.dadosEntrada.coeficienteCulturaNome = this.mainProvider.kc[index]["Cultura"]
        this.mainProvider.dadosEntrada.coeficienteCultura = this.mainProvider.kc[index]["ESTAG4"]
      }
    }
  }

  redirect() {
    this.navCtrl.popTo(DadosEntradaPage);
    setTimeout(() => {
      this.mainProvider.recuperar();
    }, 500);

  }

  ionViewDidLoad() {
    this.mainProvider.feedbackGeoLocation.subscribe(data => {
      if (data) {
        this.isGPS = true;
      } else {
        this.isGPS = "error"
      }
    })
    this.mainProvider.feedbackWeather.subscribe(data => {
      if (data) {
        this.isWeather = true;
      } else {
        this.isWeather = "error";
      }
    })
    console.log('ionViewDidLoad DadosEntradaPage');
  }

}
