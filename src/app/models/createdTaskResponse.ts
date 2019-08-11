export interface CreatedTaskResponse {
   message: string;
   createdTodo: {
      _id: string;
      name: string;
      category: string;
      priority: number;
   };
}
