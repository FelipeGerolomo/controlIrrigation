import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { DataLocal } from '../../models/data_local';
import { RadiacaoSolarLiquida } from '../../models/calc_radiacao_solar_liquida';
import { ParametrosMeteorologicos } from '../../models/parametros_meteorologicos';
import { Evapotranspiracao } from '../../models/evapotranspiracao';
import { Geolocation } from '@ionic-native/geolocation';
import { Coordinates } from '../../models/coordinates';
import { Events } from 'ionic-angular';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { Storage } from '@ionic/storage';

/*
  Generated class for the MainProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MainProvider {

  dadosEntrada: DataLocal = new DataLocal();
  radiacao_solar: RadiacaoSolarLiquida = new RadiacaoSolarLiquida();
  meteorologia: ParametrosMeteorologicos = new ParametrosMeteorologicos();
  evapotranspiracao: Evapotranspiracao = new Evapotranspiracao();
  coordinates: Coordinates = new Coordinates();
  local: any;
  kc: any;
  nativeGeocode: any;
  cidade: String;

  @Output() feedbackGeoLocation = new EventEmitter();
  @Output() feedbackWeather = new EventEmitter();


  constructor(public http: HttpClient, private geolocation: Geolocation, public events: Events, private nativeGeocoder: NativeGeocoder, private storage: Storage) {
    this.getCoefCultura();
    
    // this.getGeolocation();
  }

  getGeolocation() {
    var options = { maximumAge: 3000, timeout: 15000, enableHighAccuracy: false };
    this.geolocation.getCurrentPosition(options).then((resp) => {
      this.coordinates.setValues(resp.coords.latitude, resp.coords.longitude, resp.coords.altitude)
      this.cidade = "Maringá" //Remover
      this.getCurrentWeather('Maringá');
      this.feedbackGeoLocation.emit(true);
      // this.geoCode(resp.coords.latitude, resp.coords.longitude)
      console.log(this.coordinates)
    }).catch((error) => {
      this.feedbackGeoLocation.emit(false);
      console.log('Error getting location', error);
    });
  }

  geoCode(lat, long) {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(lat, long, options)
      .then(
        (result: NativeGeocoderReverseResult[]) => {
          console.log(JSON.stringify(result))
          this.cidade = result[0]["subAdministrativeArea"];
          console.log("cidade", this.cidade);
          this.getCurrentWeather(this.cidade)
        })
      .catch((error: any) => console.log(error));
  }

  getCurrentWeather(cidade) {
    this.http.get("http://api.openweathermap.org/data/2.5/weather?q=" + cidade + ",BRA&appid=99b3f54b15ebb716b7b4d13714dfcb57")
      .subscribe(
        (data) => {
          this.meteorologia.setValues(
            data['name'] + ", " + data['sys'].country,
            data['main'].temp,
            data['main'].temp_max,
            data['main'].temp_min,
            0,
            data['main'].humidity,
            data['wind'].speed
          )
          this.feedbackWeather.emit(true);
          console.log(this.meteorologia)
        },
        (error) => {
          this.feedbackWeather.emit(false);
          console.log('Error getting weather', error);
        }
      )
  }

  getCoefCultura() {
    this.http.get("assets/kc.json")
      .subscribe(data => {
        this.kc = data;
      })
  }

  saveLocal() {
    this.dadosEntrada.cidade = this.cidade;
    this.dadosEntrada.latitude = -0.39;
    this.dadosEntrada.longitude = this.coordinates.longitude;
    this.dadosEntrada.altitude = 30.00;
    this.dadosEntrada.calcPatm();
    this.dadosEntrada.calcConstantePsicometrica();
    this.storage.set('local', this.dadosEntrada);
    this.getDistanciaSolLua();
    console.log(this.dadosEntrada)
  }

  // <------ Cálculos da Radiação Solar Start ------>
  getDistanciaSolLua() {
    let valor = (1 + 0.033);
    valor = valor * (Math.cos((2 * Math.PI * this.radiacao_solar.diasJuliano) * 365));
    this.radiacao_solar.distanciaSolLua = valor;
    this.getDeclividadeSolar();
  }

  getDeclividadeSolar() {
    let valor = 0.409
    valor = valor * Math.sin(2 * Math.PI * this.radiacao_solar.diasJuliano / 365 - 1.39)
    this.radiacao_solar.declividadeSolar = valor;
    this.getX();
  }

  getX() {
    let tan1 = (Math.tan(this.radiacao_solar.declividadeSolar))
    tan1 = Math.pow(tan1, 2)
    let tan2 = (Math.tan(this.dadosEntrada.latitude))
    tan2 = Math.pow(tan2, 2)
    let valor = (1 - (tan1 * tan2));
    this.radiacao_solar.x = valor;
    this.getAnguloNascerSol();
  }

  getAnguloNascerSol() {
    let x_2 = Math.pow(this.radiacao_solar.x, 0.5);
    let valor = Math.PI / 2 - Math.atan(-Math.tan(this.dadosEntrada.latitude) * Math.tan(this.radiacao_solar.declividadeSolar) / x_2);
    this.radiacao_solar.anguloNascerSol = valor;
    this.getStop();
  }

  getStop() {
    let dist_pi = (118.08 * (this.radiacao_solar.distanciaSolLua / Math.PI));
    let valor = dist_pi * ((this.radiacao_solar.anguloNascerSol) * (Math.sin(this.dadosEntrada.latitude)) * (Math.sin(this.radiacao_solar.declividadeSolar)) + (Math.cos(this.dadosEntrada.latitude)) * (Math.cos(this.radiacao_solar.declividadeSolar) * (Math.sin(this.radiacao_solar.anguloNascerSol))))
    this.radiacao_solar.radiacaoSolarTop = valor;
    this.getSsup();
  }

  getSsup() {
    let valor = 0.19 * this.radiacao_solar.radiacaoSolarTop;
    let raiz = Math.sqrt((this.meteorologia.temp_max) - (this.meteorologia.temp_min))
    valor = valor * raiz;
    this.radiacao_solar.radiacaoSolarSup = valor;
    this.getRadiacaoLiquida();
  }

  getRadiacaoLiquida() {
    let valor = 1 - this.dadosEntrada.albedo
    valor = valor * this.radiacao_solar.radiacaoSolarSup;
    this.radiacao_solar.radiacaoSolarLiquida = valor;
    // console.log(this.radiacao_solar)
    this.getDelta();
  }

  // <------ Cálculos da Radiação Solar END ------>

  getDelta() {
    let potencia = Math.pow((this.meteorologia.temp_avg + 237.3), 2)
    let exp = Math.exp((17.27 * this.meteorologia.temp_avg) / (this.meteorologia.temp_avg + 237.3))
    let valor = 4098 * (0.6108 * exp) / potencia
    this.evapotranspiracao.delta = valor;
    this.getDeficitSaturacaoS();
  }

  getDeficitSaturacaoS() {
    let valor = 0.6108 * (Math.exp((17.27 * this.meteorologia.temp_avg) / (this.meteorologia.temp_avg + 237.3)));
    this.evapotranspiracao.deficitSaturacaoS = valor;
    this.getDeficitSaturacaoA();
  }

  getDeficitSaturacaoA() {
    let valor = (this.meteorologia.humidity * this.evapotranspiracao.deficitSaturacaoS) / 100
    this.evapotranspiracao.deficitSaturacaoA = valor;
    this.getDeficitSaturacao();
  }

  getDeficitSaturacao() {
    let valor = this.evapotranspiracao.deficitSaturacaoS - this.evapotranspiracao.deficitSaturacaoA;
    this.evapotranspiracao.deficitSaturacao = valor;
    this.getEvapotranspiracaoReferencia()
  }

  getEvapotranspiracaoReferencia() {
    //Revisar a Formula
    let valor1 = (0.408 * this.evapotranspiracao.delta * this.radiacao_solar.radiacaoSolarLiquida) + (this.dadosEntrada.constante_psicometrica * (900 / (this.meteorologia.temp_avg + 273))) * this.meteorologia.wind * this.evapotranspiracao.delta * this.evapotranspiracao.deficitSaturacao;
    let valor2 = (this.evapotranspiracao.delta + this.dadosEntrada.constante_psicometrica * (1 + 0.34 * this.meteorologia.wind))
    valor1 = valor1
    // valor2 = valor2.toFixed(2)-0.01;
    let valorFinal = valor1 / valor2;
    // valorFinal = valorFinal-0.01;
    this.evapotranspiracao.evapotranspiracaoReferencia = valorFinal;
    this.getKc();
  }

  getKc() {
    let potencia = Math.pow((2 / 3), 0.3);
    let valor = this.dadosEntrada.coeficienteCultura + (0.04) * (this.meteorologia.wind - 2) - 0.004 * (this.meteorologia.humidity - 45) * potencia;
    this.evapotranspiracao.kc = valor;
    this.getEvapotranspiracaoCulturaDia();
  }

  getEvapotranspiracaoCulturaDia() {
    let valor = this.evapotranspiracao.evapotranspiracaoReferencia * this.evapotranspiracao.kc;
    this.evapotranspiracao.evapotranspiracaoCulturaDia = valor;
    this.getEvapotranspiracaoCulturaMes();
  }

  getEvapotranspiracaoCulturaMes() {
    //Verificar Formula
    let culturaDia = this.evapotranspiracao.evapotranspiracaoCulturaDia;
    let valor = culturaDia * 30;
    valor = valor - 0.11
    this.evapotranspiracao.evapotranspiracaoCulturaMes = valor;
    this.getBalanco();
  }

  getBalanco() {
    let valor = this.meteorologia.precipitation - this.evapotranspiracao.evapotranspiracaoCulturaMes;
    this.evapotranspiracao.balanco = valor;
    console.log(this.evapotranspiracao);
    console.log(this.radiacao_solar)
  }

}
