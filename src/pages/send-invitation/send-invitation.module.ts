import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendInvitationPage } from './send-invitation';

@NgModule({
  declarations: [
    SendInvitationPage,
  ],
  imports: [
    IonicPageModule.forChild(SendInvitationPage),
  ],
})
export class SendInvitationPageModule {}
