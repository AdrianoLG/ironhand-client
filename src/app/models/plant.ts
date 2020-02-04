export interface Plant {
   name: string;
   scientific: string;
   container: string;
   zone: string;
   gallery: Array<string>;
   sun: string;
   watering: Array<Object>;
   wateringFrequency: string;
   frost: boolean;
   soil: string;
   flowering: string;
   perishable: boolean;
   pests: Array<string>;
   img: string;
   origin: Array<string>;
   transplant: Array<string>;
   death: Date;
   deathCause: string;
}