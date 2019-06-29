import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateFamilyNewPage } from './create-family-new';

@NgModule({
  declarations: [
    CreateFamilyNewPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateFamilyNewPage),
  ],
})
export class CreateFamilyNewPageModule {}
