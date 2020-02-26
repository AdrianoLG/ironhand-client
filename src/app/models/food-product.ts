export interface FoodProduct {
   _id: string;
   name: string;
   brand: string;
   category: string;
   img: string;
   qty: string;
   unit: number;
   productQty: number;
   expiry: Date;
   tags: Array<string>;
}