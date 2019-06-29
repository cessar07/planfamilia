import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvitationsMyPage } from './invitations-my';

@NgModule({
  declarations: [
    InvitationsMyPage,
  ],
  imports: [
    IonicPageModule.forChild(InvitationsMyPage),
  ],
})
export class InvitationsMyPageModule {}
