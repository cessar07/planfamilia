import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FamiliaresPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'familiares',
})
export class FamiliaresPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  	transform(value: any, ...args) {
    	return args[0].find(x => x.family_id == value);
    	console.log(args[0].find(x => x.family_id == value));
  	}
}
