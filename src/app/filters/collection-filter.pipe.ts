import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'collectionFilter'
})
export class CollectionFilterPipe implements PipeTransform {
	transform(value: any, arg: any): any {
		if (value != null && arg != null) {
			const filteredCollections = value.filter(collection => collection.title.search(new RegExp(arg, 'i')) >= 0);
			if (filteredCollections !== 0) {
				return filteredCollections;
			}
		} else {
			return value;
		}
	}
}
