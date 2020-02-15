import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CompletedExercisesService } from 'src/app/services/completed-exercises/completed-exercises.service';
import { ExercisesService } from 'src/app/services/exercises/exercises.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompletedExercise } from 'src/app/models/completed-exercise';
import { Exercise } from 'src/app/models/exercise';
import { DateAdapter } from '@angular/material';

@Component({
  selector: 'app-completed-create',
  templateUrl: './completed-create.component.html',
  styleUrls: ['./completed-create.component.scss']
})
export class CompletedCreateComponent implements OnInit {
  addCompletedExerciseForm: FormGroup;
  completedExercise: CompletedExercise;
  availableExercises: Exercise[] = [];

  constructor(
    private _completedExercisesService: CompletedExercisesService,
    private _exercisesService: ExercisesService,
    private _location: Location,
    private _formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>
  ) { }

  ngOnInit() {
    this._adapter.setLocale('es');
    this.addCompletedExerciseForm = this._formBuilder.group({
      exerciseId: ['', [Validators.required]],
      date: [new Date(), [Validators.required]],
      repetitions: [0, []],
      time: [0, []],
      minHeart: [0, []],
      maxHeart: [0, []],
    });
    this._exercisesService.getExercises().subscribe(res => {
      for (let exercise of res.exercises) {
        this.availableExercises.push(exercise);
      }
      console.log(this.availableExercises);
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
      _id: null,
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
