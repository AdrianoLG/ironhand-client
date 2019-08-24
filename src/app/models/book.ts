export interface Book {
   _id: string;
   title: string;
   author: string;
   category: string;
   pages: number;
   img: string;
   read: boolean;
   readDate: Date;
   rating: number;
   comments: string;
}
