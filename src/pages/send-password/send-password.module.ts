import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendPasswordPage } from './send-password';

@NgModule({
  declarations: [
    SendPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(SendPasswordPage),
  ],
})
export class SendPasswordPageModule {}
