import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {
   transform(value: any): any {
      const today = new Date();
      const date = new Date(value);
      if (date.getDate() === today.getDate()
         && date.getMonth() === today.getMonth()
         && date.getFullYear() === today.getFullYear()) {
         return 'Hoy';
      } else if (date.getDate() === today.getDate() - 1
         && date.getMonth() === today.getMonth()
         && date.getFullYear() === today.getFullYear()) {
         return 'Ayer';
      } else {
         return `${date.getDate() < 10 ?
            '0' + date.getDate() : date.getDate()}/${date.getMonth() < 10 ?
            '0' + date.getMonth() : date.getMonth()}/${date.getFullYear()}`;
      }
   }
}
