import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FoodService } from '../../services/food/food.service';
import { FoodMeals } from '../../models/food-meals';
import { CompletedExercise } from 'src/app/models/completed-exercise';
import { ExerciseService } from '../../services/exercise/exercise.service';
import { MAT_DATE_LOCALE, DateAdapter } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './app-dialog.component.html',
  styleUrls: ['./app-dialog.component.scss']
})

export class DialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogComponent>, private _adapter: DateAdapter<any>) {}

  ngOnInit() {
    this._adapter.setLocale('es');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BodyComponent implements OnInit {

  foodMeals: FoodMeals;
  completedExercises: CompletedExercise;
  submitted = false;

  constructor(private foodService: FoodService,
              private exerciseService: ExerciseService,
              private router: Router,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.foodService.getFoodMeals().subscribe(foodMeals => {
      this.foodMeals = foodMeals;
    }, error => {
      if (error.status === 401) {
        this.router.navigate(['/login']);
      }
    });

    this.exerciseService.getCompletedExercises().subscribe(completedExercises => {
      this.completedExercises = completedExercises;
    }, error => {
      if (error.status === 401) {
        this.router.navigate(['login']);
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}


