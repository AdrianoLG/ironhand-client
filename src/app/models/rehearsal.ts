import { Sheet } from './sheet';

export interface Rehearsal {
   _id: string;
   instrument: string;
   time: number;
   sheets: Array<Sheet>;
}