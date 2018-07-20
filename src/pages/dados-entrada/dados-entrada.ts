import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataLocal } from '../../models/data_local';

@IonicPage()
@Component({
  selector: 'page-dados-entrada',
  templateUrl: 'dados-entrada.html',
})
export class DadosEntradaPage {
  dadosEntrada: DataLocal = new DataLocal();

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  save() {
    console.log(this.dadosEntrada)
  }

  onSetAltitude(value: string) {
    this.dadosEntrada.calcPatm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DadosEntradaPage');
  }

}
