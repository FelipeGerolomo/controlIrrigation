import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataLocal } from '../../models/data_local';
import { MainProvider } from '../../providers/main/main';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  teste: DataLocal = new DataLocal();
  constructor(
    public navCtrl: NavController,
    public mainProvider: MainProvider,
  ) {
    this.mainProvider.getGeolocation();
  }

}
