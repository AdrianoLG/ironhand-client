export interface TvSerie {
   _id: string;
   title: string;
   director: string;
   cast: Array<string>;
   tv: string;
   country: string;
   beginDate: Date;
   lastSeen: string;
   ended: boolean;
   endDate: Date;
   categories: Array<string>;
   episodeDuration: number;
   img: string;
}
