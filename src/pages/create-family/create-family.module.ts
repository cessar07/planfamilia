import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateFamilyPage } from './create-family';

@NgModule({
  declarations: [
    CreateFamilyPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateFamilyPage),
  ],
})
export class CreateFamilyPageModule {}
