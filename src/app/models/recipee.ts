export interface Recipee {
   _id: string;
   name: string;
   img: string;
   ingredients: Array<Object>;
   instructions: Array<string>;
}