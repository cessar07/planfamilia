import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodCalendarPage } from './food-calendar';

@NgModule({
  declarations: [
    FoodCalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(FoodCalendarPage),
  ],
})
export class FoodCalendarPageModule {}
