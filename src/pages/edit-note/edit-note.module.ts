import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditNotePage } from './edit-note';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    EditNotePage,
  ],
  imports: [
    IonicPageModule.forChild(EditNotePage),
    PipesModule
  ],
})
export class EditNotePageModule {}
