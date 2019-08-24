import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookFilter'
})
export class BookFilterPipe implements PipeTransform {
   transform(value: any, arg: any): any {
      if (value != null && arg != null) {
         const filteredBooks = value.filter((book) => book.title.search(new RegExp(arg, 'i')) >= 0);
         if (filteredBooks !== 0) {
            return filteredBooks;
         }
      } else {
        return value;
      }
   }
}
