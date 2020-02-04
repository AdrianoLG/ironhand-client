import { Sheet } from './sheet';

export interface Rehearsal {
   instrument: string;
   time: number;
   sheets: Array<Sheet>;
}