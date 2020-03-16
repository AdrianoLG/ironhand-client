import { Sheet } from './sheet';

export interface Rehearsal {
   _id: string;
   date: Date;
   instrument: string;
   time: number;
   sheets: Array<Sheet>;
}