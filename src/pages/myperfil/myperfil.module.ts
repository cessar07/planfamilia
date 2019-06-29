import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyperfilPage } from './myperfil';

@NgModule({
  declarations: [
    MyperfilPage,
  ],
  imports: [
    IonicPageModule.forChild(MyperfilPage),
  ],
})
export class MyperfilPageModule {}
