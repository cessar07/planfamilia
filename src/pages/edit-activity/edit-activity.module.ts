import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditActivityPage } from './edit-activity';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    EditActivityPage,
  ],
  imports: [
    IonicPageModule.forChild(EditActivityPage),
    PipesModule
  ],
})
export class EditActivityPageModule {}
