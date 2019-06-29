import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditNoteListPage } from './edit-note-list';

@NgModule({
  declarations: [
    EditNoteListPage,
  ],
  imports: [
    IonicPageModule.forChild(EditNoteListPage),
  ],
})
export class EditNoteListPageModule {}
