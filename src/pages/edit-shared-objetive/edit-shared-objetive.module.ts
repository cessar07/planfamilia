import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditSharedObjetivePage } from './edit-shared-objetive';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    EditSharedObjetivePage,
  ],
  imports: [
    IonicPageModule.forChild(EditSharedObjetivePage),
    PipesModule
  ],
})
export class EditSharedObjetivePageModule {}
