import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalObPage } from './personal-ob';

@NgModule({
  declarations: [
    PersonalObPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalObPage),
  ],
})
export class PersonalObPageModule {}
