import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailFamilyPage } from './detail-family';

@NgModule({
  declarations: [
    DetailFamilyPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailFamilyPage),
  ],
})
export class DetailFamilyPageModule {}
