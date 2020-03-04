import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'collectionFilter'
})
export class CollectionFilterPipe implements PipeTransform {
  transform(value: any, arg: any, field: any): any {
    console.log(value);
    console.log(arg);
    console.log(field);
    if (value != null && arg != null) {
      let filteredCollections;
      if (field === 'title') {
        filteredCollections = value.filter(collection => collection.title.search(new RegExp(arg, 'i')) >= 0);
      } else if (field === 'name') {
        filteredCollections = value.filter(collection => collection.name.search(new RegExp(arg, 'i')) >= 0);
      }
      if (filteredCollections !== 0) {
        return filteredCollections;
      }
    } else {
      return value;
    }
  }
}
