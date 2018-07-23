import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeteorologiaPage } from './meteorologia';

@NgModule({
  declarations: [
    MeteorologiaPage,
  ],
  imports: [
    IonicPageModule.forChild(MeteorologiaPage),
  ],
})
export class MeteorologiaPageModule {}
