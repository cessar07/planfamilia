import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailNotePage } from './detail-note';

@NgModule({
  declarations: [
    DetailNotePage,
  ],
  imports: [
    IonicPageModule.forChild(DetailNotePage),
  ],
})
export class DetailNotePageModule {}
