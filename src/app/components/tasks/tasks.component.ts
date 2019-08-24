import { Component, OnInit, ViewEncapsulation, Input, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TodosService } from '../../services/todos/todos.service';
import { ProjectsService } from '../../services/projects/projects.service';
import { Todo } from '../../models/todo';
import { MenuService } from 'src/app/services/menu/menu.service';
import { SelectedTabService } from 'src/app/services/tabs/selected-tab.service';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TasksComponent implements OnInit {

  countTodos: number;
  countProjects: number;
  todos: Todo[];
  projects: Project[];
  projectTitles: Array<string>;
  selectedIndex: number;
  selectedProject: Project;

  constructor(
    private todosService: TodosService,
    private projectsService: ProjectsService,
    private menuService: MenuService,
    private selectedTabService: SelectedTabService,
    private router: Router,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.menuService.changeMenuItems([
      {
        name: 'Cerrar sesión',
        icon: 'logout'
      },
      {
        name: 'Borrar completadas',
        icon: 'delete_outline'
      },
      {
        name: 'Salir',
        icon: 'exit_to_app'
      }
    ]);
    this.getTodos();
    this.getProjects();
    this.menuService.needRefresh.subscribe(refresh => {
      if (refresh) {
        this.todos = null;
        this.countTodos = 0;
        this.getTodos();
      }
    });
    this.selectedTabService.currentTabs.subscribe(currentTabs => {
      for (const currentTab of currentTabs) {
        if (currentTab.name === 'tasks') {
          this.selectedIndex = currentTab.selected;
        }
      }
    });
  }

  getTodos(): void {
    this.todosService.getTodos()
      .subscribe(todos => {
        this.todos = todos.todos;
        this.countTodos = +todos.count;
      }, error => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
      });
  }

  getProjects(): void {
    this.projectsService.getProjects().subscribe(res => {
      this.projects = this.sortByCategory(res.projects);
      if (this.selectedProject == null) {
        this.selectedProject = this.projects[0];
      }
      const prTitles: Array<string> = [];
      for (const prTitle of res.projects) {
        if (prTitles.indexOf(prTitle.name) < 0) {
          prTitles.push(prTitle.name);
        }
      }
      this.projectTitles = prTitles;
      this.countProjects = + res.count;
    }, error => {
      if (error.status === 401) {
        this.router.navigate(['/login']);
      }
    });
  }

  sortByCategory(projects: Project[]): Project[] {
    return projects.sort((a, b) => {
      return a.category.localeCompare(b.category);
    });
  }

  onSelection(v: any): void {
    for (const a of v) {
      if (a.value.completed) {
        this.uncompleteTodo(a.value._id);
      } else {
        this.completeTodo(a.value._id);
      }
      this.getTodos();
    }
  }

  onTodoSelection(v: any): void {
    const selectedValue = v[0].value;
    const todoList = this.selectedProject.todo;
    const doingList = this.selectedProject.doing;
    for (const todo of todoList) {
      if (todo === selectedValue) {
        const i = todoList.indexOf(todo);
        todoList.splice(i, 1);
        doingList.push(todo);
      }
    }

    this.projectsService.updateTodo(this.selectedProject._id, todoList, doingList).subscribe(res => {
      this.getProjects();
    });
  }

  onDoingSelection(v: any): void {
    const selectedValue = v[0].value;
    const doingList = this.selectedProject.doing;
    const doneList = this.selectedProject.done;
    for (const doing of doingList) {
      if (doing === selectedValue) {
        const i = doingList.indexOf(doing);
        doingList.splice(i, 1);
        doneList.push(doing);
      }
    }

    this.projectsService.updateDoing(this.selectedProject._id, doingList, doneList).subscribe(res => {
      this.getProjects();
    });
  }

  completeTodo(id): void {
    this.todosService.completeTodo(id)
      .subscribe(message => {
        console.log(message);
      }, error => {
        console.log(error);
      });
  }

  uncompleteTodo(id): void {
    this.todosService.uncompleteTodo(id)
      .subscribe(message => {
        console.log(message);
      }, error => {
        console.log(error);
      });
  }

  // this.todoToDoing(id): void {
  //   this.projectsService.
  // }

  changeSelectedIndex($event): void {
    this.selectedTabService.changeTabs([
      {
        name: 'tasks',
        selected: $event.index
      }
    ]);
    this.selectedIndex = $event.index;
  }

  onSelectProject(event: any, projectTitle: string): void {
    const el = this.elRef.nativeElement.querySelector('.projectTitle');
    this.renderer.removeClass(el, 'projectTitle');

    if (event.target.parentNode.nodeName === 'BUTTON') {
      event.target.parentNode.classList.add('projectTitle');
    } else {
      event.target.classList.add('projectTitle');
    }

    for (const project of this.projects) {
      if (project.name === projectTitle) {
        this.selectedProject = project;
        break;
      }
    }
  }

}
