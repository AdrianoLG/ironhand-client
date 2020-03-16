import { CocktailIngredient } from './cocktail-ingredient';

export interface Cocktail {
   _id: string;
   name: string;
   img: string;
   ingredients: Array<CocktailIngredient>;
   mixture: Array<string>;
}