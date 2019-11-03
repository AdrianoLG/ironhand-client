import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CompletedExercisesService } from 'src/app/services/completed-exercises/completed-exercises.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompletedExercise } from 'src/app/models/completed-exercise';

@Component({
  selector: 'app-completed-create',
  templateUrl: './completed-create.component.html',
  styleUrls: ['./completed-create.component.scss']
})
export class CompletedCreateComponent implements OnInit {
  addCompletedExerciseForm: FormGroup;
  completedExercise: CompletedExercise;

  constructor(
    private _completedExercisesService: CompletedExercisesService,
    private _location: Location,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.addCompletedExerciseForm = this._formBuilder.group({
      exerciseId: ['', [Validators.required]],
      date: ['', [Validators.required]],
      repetitions: [0, []],
      time: [0, []],
      minHeart: [0, []],
      maxHeart: [0, []],
    });
  }

  goBack(): void {
    this._location.back();
  }

  saveCompletedExercise(): void {
    if (this.addCompletedExerciseForm.invalid) {
      return;
    }
    this.completedExercise = {
      exerciseId: this.addCompletedExerciseForm.value.exerciseId,
      date: this.addCompletedExerciseForm.value.date,
      repetitions: this.addCompletedExerciseForm.value.repetitions,
      time: this.addCompletedExerciseForm.value.time,
      minHeart: this.addCompletedExerciseForm.value.minHeart,
      maxHeart: this.addCompletedExerciseForm.value.maxHeart
    };
    this._completedExercisesService.addCompletedExercise(this.completedExercise).subscribe(
      () => {
        this.goBack();
      },
      error => {
        console.log(error);
      }
    );
  }

}
