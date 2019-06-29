import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailCalendarPage } from './detail-calendar';

@NgModule({
  declarations: [
    DetailCalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailCalendarPage),
  ],
})
export class DetailCalendarPageModule {}
