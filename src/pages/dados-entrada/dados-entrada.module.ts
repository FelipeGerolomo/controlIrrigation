import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DadosEntradaPage } from './dados-entrada';

@NgModule({
  declarations: [
    DadosEntradaPage,
  ],
  imports: [
    IonicPageModule.forChild(DadosEntradaPage),
  ],
})
export class DadosEntradaPageModule {}
