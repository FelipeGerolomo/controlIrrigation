import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataLocal } from '../../models/data_local';
import { MainProvider } from '../../providers/main/main';

@IonicPage()
@Component({
  selector: 'page-dados-entrada',
  templateUrl: 'dados-entrada.html',
})
export class DadosEntradaPage {
  dadosEntrada: DataLocal = new DataLocal();
  listKC: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public mainProvider: MainProvider) {
    setTimeout(() => {
      this.getKC();
    }, 500);
  }

  save() {
    this.mainProvider.dadosEntrada = this.dadosEntrada;
    console.log(this.mainProvider.dadosEntrada)
  }

  getKC() {
    this.listKC = this.mainProvider.kc;
    console.log(this.listKC)
  }

  onSetAltitude(value: string) {
    this.dadosEntrada.calcPatm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DadosEntradaPage');
  }

}
