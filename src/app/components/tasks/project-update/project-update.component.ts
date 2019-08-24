import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Project } from 'src/app/models/project';
import { ProjectsService } from 'src/app/services/projects/projects.service';
import { ChipItem } from 'src/app/models/chip-item';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrls: ['./project-update.component.scss']
})
export class ProjectUpdateComponent implements OnInit {

  visible = true;
  todoSelectable = true;
  todoRemovable = true;
  todoAddOnBlur = true;
  todoItems: ChipItem[] = [];
  doingSelectable = true;
  doingRemovable = true;
  doingAddOnBlur = true;
  doingItems: ChipItem[] = [];
  doneSelectable = true;
  doneRemovable = true;
  doneAddOnBlur = true;
  doneItems: ChipItem[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  project: Project;
  updateProjectForm: FormGroup;
  public _id: string;

  constructor(
    private projectsService: ProjectsService,
    private location: Location,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get('_id');
    this.projectsService.getProject(this._id).subscribe(project => {
      this.project = project;
      for (const todo of this.project.todo) {
        this.todoItems.push({ name: todo });
      }
      for (const doing of this.project.doing) {
        this.doingItems.push({ name: doing });
      }
      for (const done of this.project.done) {
        this.doneItems.push({ name: done });
      }
      this.updateProjectForm.patchValue({ name: project.name, category: project.category });
    });
    this.updateProjectForm = this.formBuilder.group({
      name: ['', [ Validators.required ]],
      category: ['', [ Validators.required ]],
      todo: [[], []],
      doing: [[], []],
      done: [[], []]
    });
  }

  addItem(type: string, event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      switch (type) {
        case 'todo':
          this.todoItems.push({name: value.trim()});
          break;
        case 'doing':
          this.doingItems.push({name: value.trim()});
          break;
        case 'done':
          this.doneItems.push({name: value.trim()});
          break;
        default:
          console.log('Pass a parameter');
          break;
      }
    }

    if (input) {
      input.value = '';
    }
  }

  removeItem(type: string, item: ChipItem): void {
    switch (type) {
      case 'todo':
        if (this.todoItems.indexOf(item) >= 0) {
          this.todoItems.splice(this.todoItems.indexOf(item), 1);
        }
        break;
      case 'doing':
        if (this.doingItems.indexOf(item) >= 0) {
          this.doingItems.splice(this.doingItems.indexOf(item), 1);
        }
        break;
      case 'done':
        if (this.doneItems.indexOf(item) >= 0) {
          this.doneItems.splice(this.doneItems.indexOf(item), 1);
        }
        break;
      default:
        console.log('Pass a parameter');
        break;
    }
  }

  updateProject() {
    const todoItems: string[] = [];
    for (const todoItem of this.todoItems) {
      todoItems.push(todoItem.name);
    }
    const doingItems: string[] = [];
    for (const doingItem of this.doingItems) {
      doingItems.push(doingItem.name);
    }
    const doneItems: string[] = [];
    for (const doneItem of this.doneItems) {
      doneItems.push(doneItem.name);
    }

    this.project = {
      _id: this._id,
      name: this.updateProjectForm.value.name,
      category: this.updateProjectForm.value.category,
      todo: todoItems,
      doing: doingItems,
      done: doneItems
    };

    this.projectsService.updateProject(this.project._id, this.project).subscribe(response => {
      this.goBack();
    }, error => {
      console.log(error);
    });
  }

  deleteProject(): void {
    this.projectsService.removeProject(this._id).subscribe(response => {
      this.goBack();
    }, error => {
      console.log(error);
    });
  }

  goBack(): void {
    this.location.back();
  }

}
