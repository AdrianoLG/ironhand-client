import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Project } from 'src/app/models/project';
import { ProjectsService } from 'src/app/services/projects/projects.service';
import { ChipItem } from 'src/app/models/chip-item';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {

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
  addProjectForm: FormGroup;

  constructor(
    private projectsService: ProjectsService,
    private location: Location,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.addProjectForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
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
          this.todoItems.push({ name: value.trim() });
          break;
        case 'doing':
          this.doingItems.push({ name: value.trim() });
          break;
        case 'done':
          this.doneItems.push({ name: value.trim() });
          break;
        default:
          console.log('No more cases. Check the code');
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
        console.log('No more cases. Check the code');
        break;
    }
  }

  createProject() {
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
      _id: null,
      name: this.addProjectForm.value.name,
      category: this.addProjectForm.value.category,
      todo: todoItems,
      doing: doingItems,
      done: doneItems
    };
    this.projectsService.addProject(this.project).subscribe(res => {
      this.goBack();
    });
  }

  goBack(): void {
    this.location.back();
  }

}
