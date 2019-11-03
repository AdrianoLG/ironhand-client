export interface Movie {
   _id: string;
   title: string;
   director: string;
   year: number;
   cast: Array<string>;
   categories: Array<string>;
   duration: number;
   img: string;
   seen: boolean;
   seenDate: Date;
   rating: number;
}
