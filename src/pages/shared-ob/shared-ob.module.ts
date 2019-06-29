import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedObPage } from './shared-ob';

@NgModule({
  declarations: [
    SharedObPage,
  ],
  imports: [
    IonicPageModule.forChild(SharedObPage),
  ],
})
export class SharedObPageModule {}
