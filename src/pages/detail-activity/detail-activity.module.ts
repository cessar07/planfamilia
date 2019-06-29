import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailActivityPage } from './detail-activity';

@NgModule({
  declarations: [
    DetailActivityPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailActivityPage),
  ],
})
export class DetailActivityPageModule {}
