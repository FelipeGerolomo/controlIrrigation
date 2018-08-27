import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPerfilPage } from './add-perfil';

@NgModule({
  declarations: [
    AddPerfilPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPerfilPage),
  ],
})
export class AddPerfilPageModule {}
