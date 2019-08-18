import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MealsService } from '../../services/meals/meals.service';
import { Meals } from '../../models/meals';
import { CompletedExercise } from 'src/app/models/completed-exercise';
import { ExerciseService } from '../../services/exercise/exercise.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BodyComponent implements OnInit {

  meals: Meals[];
  count: number;
  completedExercises: CompletedExercise;
  submitted = false;

  constructor(
    private mealsService: MealsService,
    private exerciseService: ExerciseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getFoodMeals();
    this.getCompletedExercises();
  }

  getFoodMeals(): void {
    this.mealsService.getMeals().subscribe(res => {
      this.count = res.count;
      this.meals = res.meals;
      console.log(this.count);

    }, error => {
      if (error.status === 401) {
        this.router.navigate(['/login']);
      }
    });
  }

  getCompletedExercises(): void {
    this.exerciseService.getCompletedExercises().subscribe(completedExercises => {
      this.completedExercises = completedExercises;
    }, error => {
      if (error.status === 401) {
        this.router.navigate(['login']);
      }
    });
  }

}
