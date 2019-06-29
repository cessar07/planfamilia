import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewActivitiesPage } from './view-activities';

@NgModule({
  declarations: [
    ViewActivitiesPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewActivitiesPage),
  ],
})
export class ViewActivitiesPageModule {}
