import {
  Pipe,
  PipeTransform,
} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString?: any): any {

      return value
  }

}
