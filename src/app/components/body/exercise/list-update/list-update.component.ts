import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ChipItem } from 'src/app/models/chip-item';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ExercisesService } from 'src/app/services/exercises/exercises.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Exercise } from 'src/app/models/exercise';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-update',
  templateUrl: './list-update.component.html',
  styleUrls: ['./list-update.component.scss']
})
export class ListUpdateComponent implements OnInit {
  updateExerciseForm: FormGroup;
  exercise: Exercise;
  bodyPartsSelectable = true;
  bodyPartsRemovable = true;
  bodyPartsAddOnBlur = true;
  bodyPartsItems: ChipItem[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  private _id: string;

  constructor(
    private _exercisesService: ExercisesService,
    private _location: Location,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._id = this._route.snapshot.paramMap.get('_id');
    this._exercisesService.getExercise(this._id)
      .subscribe(exercise => {
        this.exercise = exercise;
        for (const part of this.exercise.bodyParts) {
          this.bodyPartsItems.push({ name: part });
        }
        this.updateExerciseForm = this._formBuilder.group({
          name: ['', [Validators.required]],
          category: ['', [Validators.required]],
          bodyParts: [[], []]
        });
        this.updateExerciseForm.patchValue({
          name: exercise.name,
          category: exercise.category
        });
      });
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

  updateExercise() {
    const bodyPartsItems: string[] = [];
    for (const bodyPartsItem of this.bodyPartsItems) {
      bodyPartsItems.push(bodyPartsItem.name);
    }
    if (this.updateExerciseForm.invalid) {
      return;
    }
    this.exercise = {
      _id: this._id,
      name: this.updateExerciseForm.value.name,
      category: this.updateExerciseForm.value.category,
      bodyParts: bodyPartsItems
    };

    this._exercisesService.updateExercise(this._id, this.exercise)
      .subscribe(() => {
        this.goBack();
      }, error => {
        console.log(error);
      });
  }

  deleteExercise() {
    this._exercisesService.removeExercise(this._id).subscribe(() => {
      this.goBack();
    }, error => {
      console.log(error);
    });
  }

  goBack(): void {
    this._location.back();
  }

}
