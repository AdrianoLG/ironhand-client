import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ChipItem } from 'src/app/models/chip-item';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ExercisesService } from 'src/app/services/exercises/exercises.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Exercise } from 'src/app/models/exercise';

@Component({
  selector: 'app-list-create',
  templateUrl: './list-create.component.html',
  styleUrls: ['./list-create.component.scss']
})
export class ListCreateComponent implements OnInit {
  addExerciseForm: FormGroup;
  exercise: Exercise;
  bodyPartsSelectable = true;
  bodyPartsRemovable = true;
  bodyPartsAddOnBlur = true;
  bodyPartsItems: ChipItem[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private _exercisesService: ExercisesService,
    private _location: Location,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.addExerciseForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      bodyParts: [[], []]
    });
  }

  goBack(): void {
    this._location.back();
  }

  addItem(type: string, event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      switch (type) {
        case 'bodyParts':
          this.bodyPartsItems.push({ name: value.trim() });
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
      case 'bodyParts':
        if (this.bodyPartsItems.indexOf(item) >= 0) {
          this.bodyPartsItems.splice(this.bodyPartsItems.indexOf(item), 1);
        }
        break;
      default:
        console.log('Pass a parameter');
        break;
    }
  }

  saveExercise(): void {
    const bodyPartsItems: string[] = [];
    for (const bodyPartsItem of this.bodyPartsItems) {
      bodyPartsItems.push(bodyPartsItem.name);
    }
    if (this.addExerciseForm.invalid) {
      return;
    }
    this.exercise = {
      _id: null,
      name: this.addExerciseForm.value.name,
      category: this.addExerciseForm.value.category,
      bodyParts: bodyPartsItems
    };
    this._exercisesService.addExercise(this.exercise).subscribe(
      () => {
        this.goBack();
      },
      error => {
        console.log(error);
      }
    );
  }

}
