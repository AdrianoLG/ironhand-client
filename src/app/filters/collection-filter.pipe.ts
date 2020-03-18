import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'collectionFilter'
})
export class CollectionFilterPipe implements PipeTransform {
  transform(value: any, arg: any, field: any): any {
    if (value != null && arg != null) {
      let filteredCollections;
      switch (field) {
        case 'titleAndAuthor':
          filteredCollections = value.filter(collection =>
            collection.title.search(new RegExp(arg, 'i')) >= 0
            || collection.author.search(new RegExp(arg, 'i')) >= 0);
          break;
        case 'titleAndDirector':
          filteredCollections = value.filter(collection =>
            collection.title.search(new RegExp(arg, 'i')) >= 0
            || collection.director.search(new RegExp(arg, 'i')) >= 0);
          break;
        case 'titleAndTV':
          filteredCollections = value.filter(collection =>
            collection.title.search(new RegExp(arg, 'i')) >= 0
            || collection.tv.search(new RegExp(arg, 'i')) >= 0);
          break;
        case 'name':
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
