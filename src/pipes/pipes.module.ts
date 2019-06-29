import { NgModule } from '@angular/core';
import { FamiliaresPipe } from './familiares/familiares';
import { ListFamilyPipe } from './list-family/list-family';
@NgModule({
	declarations: [FamiliaresPipe,
    ListFamilyPipe],
	imports: [],
	exports: [FamiliaresPipe,
    ListFamilyPipe]
})
export class PipesModule {}
