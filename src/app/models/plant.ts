export interface Watering {
   date: Date;
   fertilized: boolean;
}

export interface Plant {
   _id: string;
   name: string;
   scientific: string;
   container: string;
   zone: string;
   gallery: Array<string>;
   sun: string;
   watering: Array<Watering>;
   wateringFrequency: string;
   frost: boolean;
   soil: string;
   flowering: string;
   perishable: boolean;
   pests: Array<string>;
   img: string;
   origin: Array<string>;
   transplant: Array<Date>;
   death: Date;
   deathCause: string;
}