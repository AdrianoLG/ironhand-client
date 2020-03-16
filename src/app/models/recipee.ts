import { Ingredient } from './ingredient';

export interface Recipee {
   _id: string;
   name: string;
   img: string;
   ingredients: Array<Ingredient>;
   instructions: Array<string>;
}
