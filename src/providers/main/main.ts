import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataLocal } from '../../models/data_local';

/*
  Generated class for the MainProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MainProvider {
  dadosEntrada: DataLocal = new DataLocal();
  kc: any;
  constructor(public http: HttpClient) {
    this.getKC();
    console.log('Hello MainProvider Provider');
  }

  getKC() {
    this.http.get("assets/kc.json")
      .subscribe(data => {
        this.kc = data;
      })
  }



}
