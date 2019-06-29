import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoteListsPage } from './note-lists';

@NgModule({
  declarations: [
    NoteListsPage,
  ],
  imports: [
    IonicPageModule.forChild(NoteListsPage),
  ],
})
export class NoteListsPageModule {}
