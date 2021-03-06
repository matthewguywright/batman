import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByDate'
})
export class OrderByDatePipe implements PipeTransform {

  transform(array: Array<object>, args: string): Array<object> {
    if (!array || array === undefined || array.length === 0 || !args) { return null; };

    array.sort((a: any, b: any) => {
        if (args === 'asc') {
          if (a.Year < b.Year) {
            return -1;
          } else if (a.Year > b.Year) {
            return 1;
          } else {
            return 0;
          }
        } else if (args === 'desc') {
          if (a.Year < b.Year) {
            return 1;
          } else if (a.Year > b.Year) {
            return -1;
          } else {
            return 0;
          }
        }
    });

    return array;
  }

}
