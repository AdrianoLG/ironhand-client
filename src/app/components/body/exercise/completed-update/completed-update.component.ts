import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { CompletedExercise } from 'src/app/models/completed-exercise';
import { CompletedExercisesService } from 'src/app/services/completed-exercises/completed-exercises.service';
import { DateAdapter } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-completed-update',
  templateUrl: './completed-update.component.html',
  styleUrls: ['./completed-update.component.scss']
})
export class CompletedUpdateComponent implements OnInit {
  updateCompletedForm: FormGroup;
  completedExercise: CompletedExercise;
  private _id: string;

  constructor(
    private _completedExercisesService: CompletedExercisesService,
    private _adapter: DateAdapter<any>,
    private _location: Location,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._adapter.setLocale('es');
    this._id = this._route.snapshot.paramMap.get('_id');
    this._completedExercisesService.getCompletedExercise(this._id)
      .subscribe(completedExercise => {
        this.completedExercise = completedExercise;
        this.updateCompletedForm = this._formBuilder.group({
          exerciseId: ['', [Validators.required]],
          date: ['', [Validators.required]],
          repetitions: [0, []],
          time: [0, []],
          minHeart: [0, []],
          maxHeart: [0, []]
        });
        this.updateCompletedForm.patchValue({
          exerciseId: completedExercise.exerciseId,
          date: completedExercise.date,
          repetitions: completedExercise.repetitions,
          time: completedExercise.time,
          minHeart: completedExercise.minHeart,
          maxHeart: completedExercise.maxHeart
        });
      });
  }

  updateCompletedExercise() {
    this.completedExercise = {
      exerciseId: this.updateCompletedForm.value.exerciseId,
      date: this.updateCompletedForm.value.date,
      repetitions: this.updateCompletedForm.value.repetitions,
      time: this.updateCompletedForm.value.time,
      minHeart: this.updateCompletedForm.value.minHeart,
      maxHeart: this.updateCompletedForm.value.maxHeart
    };

    this._completedExercisesService.updateCompletedExercise(this._id, this.completedExercise).subscribe(() => {
      this.goBack();
    }, error => {
      console.log(error);
    });
  }

  goBack(): void {
    this._location.back();
  }

}
