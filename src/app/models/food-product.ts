export interface FoodProduct {
   name: string;
   brand: string;
   category: string;
   img: string;
   qty: string;
   unitQty: string;
   unit: number;
   productQty: number;
   expiry: Date;
   tags: Array<string>;
}