import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { LocalNotifications } from "@ionic-native/local-notifications";
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DadosEntradaPage } from '../pages/dados-entrada/dados-entrada';
import { MeteorologiaPage } from '../pages/meteorologia/meteorologia';
import { MainProvider } from '../providers/main/main';
import { HttpClientModule } from '@angular/common/http';
import { GeolocationPage } from '../pages/geolocation/geolocation';
import { AddPerfilPage } from '../pages/add-perfil/add-perfil';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DadosEntradaPage,
    MeteorologiaPage,
    GeolocationPage,
    AddPerfilPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DadosEntradaPage,
    MeteorologiaPage,
    GeolocationPage,
    AddPerfilPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    NativeGeocoder, 
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MainProvider,
  ]
})
export class AppModule { }
