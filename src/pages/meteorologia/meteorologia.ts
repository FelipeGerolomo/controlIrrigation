import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MainProvider } from '../../providers/main/main';
import { ParametrosMeteorologicos } from '../../models/parametros_meteorologicos';

/**
 * Generated class for the MeteorologiaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-meteorologia',
  templateUrl: 'meteorologia.html',
})
export class MeteorologiaPage {
  dados: ParametrosMeteorologicos = new ParametrosMeteorologicos();
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private mainProvider: MainProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeteorologiaPage');
  }

}
