import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditlistnotePage } from './editlistnote';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    EditlistnotePage,
  ],
  imports: [
    IonicPageModule.forChild(EditlistnotePage),
    PipesModule
  ],
})
export class EditlistnotePageModule {}
