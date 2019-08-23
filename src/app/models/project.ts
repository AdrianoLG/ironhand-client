export interface Project {
   _id: string;
   name: string;
   category: string;
   todo: Array<string>;
   doing: Array<string>;
   done: Array<string>;
}
