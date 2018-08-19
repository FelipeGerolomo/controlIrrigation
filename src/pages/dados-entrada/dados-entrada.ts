import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mainProvider: MainProvider,
    private geolocation: Geolocation
  ) {
    setTimeout(() => {
      this.getKC();
    }, 500);


  }

  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords)
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      console.log(data.coords)
    });
  }

  save() {
    this.mainProvider.dadosEntrada = this.dadosEntrada;
    console.log(this.mainProvider.dadosEntrada)
  }

  getKC() {
    this.listKC = this.mainProvider.kc;
    // console.log(this.listKC)
  }

  onSetAltitude(value: string) {
    this.dadosEntrada.calcPatm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DadosEntradaPage');
  }

}
