import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { DataLocal } from '../../models/data_local';
import { MainProvider } from '../../providers/main/main';
import { AddPerfilPage } from '../add-perfil/add-perfil';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-dados-entrada',
  templateUrl: 'dados-entrada.html',
})
export class DadosEntradaPage {
  // dadosEntrada: DataLocal = new DataLocal();
  listKC: any;
  local: any;
  isGPS: any = false;
  isWeather: any = false;
  isError: any = false;
  isLocal: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mainProvider: MainProvider,
    public loadingCtrl: LoadingController,
    public events: Events,
    private storage: Storage
  ) {
    this.recuperar();
    this.mainProvider.getGeolocation();
  }

  onChange(id) {
    for (let index = 0; index < this.mainProvider.kc.length; index++) {
      if (id == this.mainProvider.kc[index]["ID"]) {
        this.mainProvider.dadosEntrada.coeficienteCultura = this.mainProvider.kc[index]["ESTAG4"]
      }
    }
  }

  criar() {
    this.navCtrl.push(AddPerfilPage)
  }

  recuperar() {
    this.storage.get('local').then((val) => {
      if (val == null) {
        this.isLocal = false;
        this.local = null;
        // console.log("local", val)
      } else {
        this.isLocal = true;
        this.local = val;
        // console.log("local", val)
      }
    });
  }

  excluir() {
    this.storage.remove('local');
    setTimeout(() => {
      this.recuperar();
    }, 1000);

  }

  ionViewDidLoad() {
    this.recuperar();
    console.log('ionViewDidLoad DadosEntradaPage');
  }

}

