import { Component, OnInit, ViewEncapsulation, Input, ElementRef, Renderer2, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { SelectedTabService, Tab } from 'src/app/services/tabs/selected-tab.service';
import { TodosService } from '../../services/todos/todos.service';
import { ProjectsService } from '../../services/projects/projects.service';
import { Todo } from '../../models/todo';
import { Project } from 'src/app/models/project';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { Subscription, fromEvent } from 'rxjs';
import { take, filter } from 'rxjs/operators';
import { TemplatePortal } from '@angular/cdk/portal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TasksComponent implements OnInit {

  @ViewChild('todoMenu') todoMenu: TemplateRef<any>;
  overlayRef: OverlayRef | null;
  sub: Subscription;
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
    private _selectedTabService: SelectedTabService,
    private _elRef: ElementRef,
    private _renderer: Renderer2,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getTodos();
    this.getProjects();
    this._selectedTabService.currentTabs.subscribe(currentTabs => {
      this.currentTabs = currentTabs;
      for (const currentTab of currentTabs) {
        if (currentTab.name === 'tasks') {
          this.tabGroup = currentTabs.indexOf(currentTab);
          this.selectedIndex = currentTab.selected;
        }
      }
    });
    this.selectedProject = null;
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
    this._todosService.completeTodo(id).subscribe();
  }

  uncompleteTodo(id): void {
    this._todosService.uncompleteTodo(id).subscribe();
  }

  updateTodo(todo: Todo): void {
    this.closeContextMenu();
    this._router.navigate(['/tareas/todo/actualizar/' + todo._id]);
  }

  deleteTodo(todo: Todo): void {
    this._todosService.deleteTodo(todo._id).subscribe(() => {
      this.closeContextMenu();
      this.getTodos();
    });
  }
  deleteAllCompleted(): void {
    this._todosService.deleteCompleted().subscribe(() => {
      this.closeContextMenu();
      this.getTodos();
    });
  }

  changeSelectedIndex($event): void {
    const tabIndex = $event.index;
    this.selectedIndex = tabIndex;
    this.currentTabs[this.tabGroup].selected = tabIndex;
    this._selectedTabService.changeTabs(this.currentTabs);
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

  openContextMenuPress(event, todo) {
    let x = event.center.x;
    let y = event.center.y;
    this.openContextMenu({ x, y }, todo, 'press');
    console.log('open');
  }

  openContextMenuRightClick({ x, y}, todo) {
    this.openContextMenu({ x, y }, todo, 'right');
  }

  openContextMenu({ x, y}, todo, type) {
    this.closeContextMenu();
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo({ x, y })
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        }
      ]);
    
    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
      hasBackdrop: true,
      panelClass: ['modal', 'is-active'],
      backdropClass: 'modal-background'
    });

    this.overlayRef.attach(new TemplatePortal(this.todoMenu, this.viewContainerRef, {
      $implicit: todo
    }));
    
    if (type === 'right' || type === undefined) {
      console.log('right');
      
      this.sub = fromEvent<MouseEvent>(document, 'click')
        .pipe(
          filter(event => {
            const clickTarget = event.target as HTMLElement;
            return !!this.overlayRef && !this.overlayRef.overlayElement.contains(clickTarget);
          }),
          take(1)
        ).subscribe(() => this.closeContextMenu());
    } else if (type === 'press') {
      setTimeout(() => {
        this.sub = fromEvent<MouseEvent>(document, 'click')
          .pipe(
            filter(event => {
              const clickTarget = event.target as HTMLElement;
              return !!this.overlayRef && !this.overlayRef.overlayElement.contains(clickTarget);
            }),
            take(1)
          ).subscribe(() => this.closeContextMenu());
      }, 1000);
    }
  }

  closeContextMenu() {
    console.log('hey');
    
    this.sub && this.sub.unsubscribe();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  // Changes selected tab - swipes
  changeSection(tabIndex): void {
    this.selectedIndex = tabIndex;
    this.currentTabs[this.tabGroup].selected = tabIndex;
    this._selectedTabService.changeTabs(this.currentTabs);
  }

  // If exists it stablishes the next tab
  nextSection(selectedIndex) {
    if (selectedIndex < document.getElementsByClassName('mat-tab-label').length - 1) {
      this.changeSection(selectedIndex + 1);
    }
  }

  // If exists it stablishes the previous tab
  previousSection(selectedIndex) {
    if (selectedIndex > 0) {
      this.changeSection(selectedIndex - 1);
    }
  }

}
