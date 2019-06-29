import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailNewPage } from './detail-new';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    DetailNewPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailNewPage),
    IonicImageLoader
  ],
})
export class DetailNewPageModule {}
