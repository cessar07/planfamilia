import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailFamilyNewPage } from './detail-family-new';

@NgModule({
  declarations: [
    DetailFamilyNewPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailFamilyNewPage),
  ],
})
export class DetailFamilyNewPageModule {}
