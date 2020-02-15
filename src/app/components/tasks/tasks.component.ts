import { Component, OnInit, ViewEncapsulation, Input, ElementRef, Renderer2 } from '@angular/core';
import { SelectedTabService, Tab } from 'src/app/services/tabs/selected-tab.service';
import { TodosService } from '../../services/todos/todos.service';
import { ProjectsService } from '../../services/projects/projects.service';
import { Todo } from '../../models/todo';
import { MenuService } from 'src/app/services/menu/menu.service';
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
  currentTabs: Tab[];
  todos: Todo[];
  projects: Project[];
  projectTitles: Array<string>;
  selectedIndex: number;
  selectedProject: Project;
  tabGroup: number;

  constructor(
    private _todosService: TodosService,
    private _projectsService: ProjectsService,
    private _menuService: MenuService,
    private _selectedTabService: SelectedTabService,
    private _elRef: ElementRef,
    private _renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.getTodos();
    this.getProjects();
    this._selectedTabService.currentTabs.subscribe(currentTabs => {
      this.currentTabs = currentTabs;
      console.log(this.currentTabs);

      for (const currentTab of currentTabs) {
        if (currentTab.name === 'tasks') {
          this.tabGroup = currentTabs.indexOf(currentTab);
          this.selectedIndex = currentTab.selected;
        }
      }
    });
    this.selectedProject = null;
    this._menuService.changeMenuItems([
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
    this._menuService.needRefresh.subscribe(refresh => {
      if (refresh) {
        this.todos = null;
        this.countTodos = 0;
        this.getTodos();
      }
    });
  }

  getTodos(): void {
    this._todosService.getTodos().subscribe(todos => {
      this.todos = todos.todos;
      this.countTodos = + todos.count;
    });
  }

  getProjects(): void {
    this._projectsService.getProjects().subscribe(res => {
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

    this._projectsService.updateTodo(this.selectedProject._id, todoList, doingList).subscribe(res => {
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

    this._projectsService.updateDoing(this.selectedProject._id, doingList, doneList).subscribe(res => {
      this.getProjects();
    });
  }

  completeTodo(id): void {
    this._todosService.completeTodo(id)
      .subscribe(message => {
        console.log(message);
        this.getTodos();
      }, error => {
        console.log(error);
      });
  }

  uncompleteTodo(id): void {
    this._todosService.uncompleteTodo(id)
      .subscribe(message => {
        console.log(message);
      }, error => {
        console.log(error);
      });
  }

  changeSelectedIndex($event): void {
    const tabIndex = $event.index;
    this.selectedIndex = tabIndex;
    this.currentTabs[this.tabGroup].selected = tabIndex;
    this._selectedTabService.changeTabs(this.currentTabs);
    console.log(`TabGroup ${this.tabGroup}, SelectedIndex ${this.selectedIndex}`);
  }

  onSelectProject(event: any, projectTitle: string): void {
    const el = this._elRef.nativeElement.querySelector('.projectTitle');
    this._renderer.removeClass(el, 'projectTitle');

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
