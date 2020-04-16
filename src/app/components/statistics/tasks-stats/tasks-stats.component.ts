import { Component, OnInit } from '@angular/core';
import { TodosService } from 'src/app/services/todos/todos.service';
import { ProjectsService } from 'src/app/services/projects/projects.service';

@Component({
  selector: 'app-tasks-stats',
  templateUrl: './tasks-stats.component.html',
  styleUrls: ['./tasks-stats.component.scss']
})
export class TasksStatsComponent implements OnInit {
  todos: any;
  completedTodos: number;
  todosCalled: boolean;
  projectsByCategory: any;
  projectsCalled: boolean;

  constructor(
    private _todosService: TodosService,
    private _projectsService: ProjectsService
  ) { }

  ngOnInit(): void {
    this.todosCalled = false;
    this.projectsCalled = false;
    this.projectsByCategory = [];
  }

  getTasks() {
    if (!this.todosCalled) {
      this._todosService.getTodos().subscribe(todos => {
        this.todos = todos;
        this.completedTodos = 0;
        for (let todo of todos.todos) {
          if (todo.completed)
            this.completedTodos++;
        }
        this.todosCalled = true;
      });
    }
    if (!this.projectsCalled) {
      this._projectsService.getProjects().subscribe(projects => {
        let projectCategory = '';
        for (let project of projects.projects) {
          let sum = project.todo.length + project.doing.length + project.done.length;
          let todoPer = project.todo.length * 100 / sum;
          let doingPer = project.doing.length * 100 / sum;
          let donePer = project.done.length * 100 / sum;
          console.log(todoPer + ', ' + doingPer + ', ' + donePer);
          if (projectCategory != project.category) {
            this.projectsByCategory.push({ 
              category: project.category, 
              projects: [{ 
                name: project.name, 
                todo: { length: project.todo.length, percentage: todoPer }, 
                doing: { length: project.doing.length, percentage: doingPer }, 
                done: { length: project.done.length, percentage: donePer } 
              }] 
            });
            projectCategory = project.category;
          } else {
            this.projectsByCategory[this.projectsByCategory.length - 1].projects.push({ 
              name: project.name, 
              todo: { length: project.todo.length, percentage: todoPer }, 
              doing: { length: project.doing.length, percentage: doingPer }, 
              done: { length: project.done.length, percentage: donePer } 
            });
          }
        }
      });
      this.projectsCalled = true;
    }
  }

}
