import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ListFamilyPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'listFamily',
})
export class ListFamilyPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return value.toLowerCase();
  }
}
