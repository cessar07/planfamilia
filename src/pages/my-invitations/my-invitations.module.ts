import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyInvitationsPage } from './my-invitations';

@NgModule({
  declarations: [
    MyInvitationsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyInvitationsPage),
  ],
})
export class MyInvitationsPageModule {}
