import { Pipe, PipeTransform } from '@angular/core';
import { Recipee } from '../models/recipee';

export interface TempObject {
  qty: number;
  name: string;
}

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
        case 'nameAndCategory':
          filteredCollections = value.filter(collection =>
            collection.name.search(new RegExp(arg, 'i')) >= 0
            || collection.category.search(new RegExp(arg, 'i')) >= 0);
          break;
        case 'nameAndIngredients':
          const tempMatchIngredient: Array<Recipee> = [];
          const tempMatchName: Array<Recipee> = [];
          for (const item of value) {
            if (item.name.search(new RegExp(arg, 'i')) >= 0) {
              tempMatchName.push(item);
            }
          }
          for (const item of value) {
            for (const ingredient of item.ingredients) {
              if (ingredient.name.search(new RegExp(arg, 'i')) >= 0) {
                tempMatchIngredient.push(item);
                break;
              }
            }
          }
          const tempMatchIngredientAndName = [...tempMatchName, ...tempMatchIngredient];
          const distinctMatch = new Set(tempMatchIngredientAndName);
          filteredCollections = distinctMatch;
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
