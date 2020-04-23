import { Component, OnInit } from '@angular/core';0
import { MealsService } from 'src/app/services/meals/meals.service';
import { CompletedExercisesService } from 'src/app/services/completed-exercises/completed-exercises.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-body-stats',
  templateUrl: './body-stats.component.html',
  styleUrls: ['./body-stats.component.scss']
})
export class BodyStatsComponent implements OnInit {
  mealsCalled: boolean;
  exercisesCalled: boolean;
  today: Date;
  meals: any;
  exercises: any;
  foodRange: string;
  exerciseRange: string;
  foodChart: any;
  exerciseChart: any;

  constructor(
    private _mealsService: MealsService,
    private _completedExerciseService: CompletedExercisesService
  ) { }

  ngOnInit(): void {
    this.mealsCalled = false;
    this.exercisesCalled = false;
    this.today = new Date();
    this.meals = {};
    this.exercises = {};
    this.foodRange = 'Este mes';
    this.exerciseRange = 'Este mes';
    this.foodChart = new Chart('foodChart', {
      type: 'line',
      data: {
          labels: [ 'Desayuno', 'Comida', 'Cena' ],
          datasets: [
            {
              label: 'Esta semana',
              data: [0, 0, 0],
              backgroundColor: 'rgba(183, 28, 28, .5)',
              borderColor: 'rgba(183, 28, 28, .5)',
              fill: false
            },
            {
              label: 'Semana pasada',
              data: [0, 0, 0],
              backgroundColor: 'rgba(38, 50, 56, .5)',
              borderColor: 'rgba(38, 50, 56, .5)',
              fill: false
            }
          ]
      },
      options: {
        legend: {
          position: 'bottom'
        }
      }
    });
    this.exerciseChart = new Chart('exerciseChart', {
      type: 'line',
      data: {
          labels: [ 'Estiramiento', 'Cardio', 'Fuerza' ],
          datasets: [
            {
              label: 'Esta semana',
              data: [0, 0, 0],
              backgroundColor: 'rgba(183, 28, 28, .5)',
              borderColor: 'rgba(183, 28, 28, .5)',
              fill: false
            },
            {
              label: 'Semana pasada',
              data: [0, 0, 0],
              backgroundColor: 'rgba(38, 50, 56, .5)',
              borderColor: 'rgba(38, 50, 56, .5)',
              fill: false
            }
          ]
      },
      options: {
        legend: {
          position: 'bottom'
        }
      }
    });
  }

  getBody() {
    if (!this.mealsCalled) {
      this._mealsService.getMeals().subscribe(meals => {
        let thisWeekMeals = {
          breakfast: 0,
          lunch: 0,
          dinner: 0
        };
        let weekBeforeMeals = {
          breakfast: 0,
          lunch: 0,
          dinner: 0
        };
        let thisMonthMeals = {
          breakfast: 0,
          lunch: 0,
          dinner: 0
        };
        let monthBeforeMeals = {
          breakfast: 0,
          lunch: 0,
          dinner: 0
        };
        for (let meal of meals.meals) {
          let date = new Date(meal.date);
          let daysPassed = this.getDifferenceInDays(this.today, date);
          if (daysPassed < 8) {
            thisWeekMeals = this.countMeals(thisWeekMeals, meal);
          } else if (daysPassed >= 8 && daysPassed < 15) {
            weekBeforeMeals = this.countMeals(weekBeforeMeals, meal);
          }
          if (daysPassed < 31) {
            thisMonthMeals = this.countMeals(thisMonthMeals, meal);
          } else if (daysPassed >= 31 && daysPassed < 61) {
            monthBeforeMeals = this.countMeals(monthBeforeMeals, meal);
          }
          if (daysPassed >= 31) {
            break;
          }
        }
        this.meals = {
          thisWeekMeals: thisWeekMeals,
          weekBeforeMeals: weekBeforeMeals,
          thisMonthMeals: thisMonthMeals,
          monthBeforeMeals: monthBeforeMeals
        }
        this.foodChart.data.datasets[0].data = this.getFoodData(this.meals.thisWeekMeals);
        this.foodChart.data.datasets[1].data = this.getFoodData(this.meals.weekBeforeMeals);
        this.foodChart.update();
      });
    }
    if (!this.exercisesCalled) {
      this._completedExerciseService.getCompletedExercises().subscribe(exercises => {
        let thisWeekExercises = {
          stretching: 0,
          heart: 0,
          strength: 0
        };
        let weekBeforeExercises = {
          stretching: 0,
          heart: 0,
          strength: 0
        };
        let thisMonthExercises = {
          stretching: 0,
          heart: 0,
          strength: 0
        };
        let monthBeforeExercises = {
          stretching: 0,
          heart: 0,
          strength: 0
        };
        for (let exercise of exercises.completedExercises) {
          let date = new Date(exercise.date);
          let daysPassed = this.getDifferenceInDays(this.today, date);
          if (daysPassed < 8) {
            thisWeekExercises = this.countExercises(thisWeekExercises, exercise);
          } else if (daysPassed >= 8 && daysPassed < 15) {
            weekBeforeExercises = this.countExercises(weekBeforeExercises, exercise);
          }
          if (daysPassed < 31) {
            thisMonthExercises = this.countExercises(thisMonthExercises, exercise);
          } else if (daysPassed >= 31 && daysPassed < 61) {
            monthBeforeExercises = this.countExercises(monthBeforeExercises, exercise);
          }
          if (daysPassed >= 31) {
            break;
          }
        }
        this.exercises = {
          thisWeekExercises: thisWeekExercises,
          weekBeforeExercises: weekBeforeExercises,
          thisMonthExercises: thisMonthExercises,
          monthBeforeExercises: monthBeforeExercises
        }
        this.exerciseChart.data.datasets[0].data = this.getExerciseData(this.exercises.thisWeekExercises);
        this.exerciseChart.data.datasets[1].data = this.getExerciseData(this.exercises.weekBeforeExercises);
        this.exerciseChart.update();
      });
    }
  }

  getDifferenceInDays(date1, date2) {
    var diff = date1.getTime() - date2.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  }

  countMeals(meals, meal) {
    if (meal.breakfast.length > 0) {
      meals.breakfast++;
    }
    if (meal.lunch.length > 0) {
      meals.lunch++;
    }
    if (meal.dinner.length > 0) {
      meals.dinner++;
    }
    return meals;
  }

  countExercises(exercises, exercise) {
    if (exercise.minHeart === null) {
      exercises.stretching++;
    } else if (exercise.repetitions === null && exercise.minHeart !== null) {
      exercises.heart++;
    } else {
      exercises.strength++;
    }
    return exercises;
  }

  changeFoodRange() {
    if (this.foodRange === 'Esta semana') {
      this.foodRange = 'Este mes';
      this.foodChart.data.datasets[0].data = this.getFoodData(this.meals.thisWeekMeals);
      this.foodChart.data.datasets[0].label = 'Esta semana';
      this.foodChart.data.datasets[1].data = this.getFoodData(this.meals.weekBeforeMeals);
      this.foodChart.data.datasets[1].label = 'Semana pasada';
      this.foodChart.update();
    } else {
      this.foodRange = 'Esta semana';
      this.foodChart.data.datasets[0].data = this.getFoodData(this.meals.thisMonthMeals);
      this.foodChart.data.datasets[0].label = 'Este mes';
      this.foodChart.data.datasets[1].data = this.getFoodData(this.meals.monthBeforeMeals);
      this.foodChart.data.datasets[1].label = 'Mes pasado';
      this.foodChart.update();
    }
  }

  changeExerciseRange() {
    if (this.exerciseRange === 'Esta semana') {
      this.exerciseRange = 'Este mes';
      this.exerciseChart.data.datasets[0].data = this.getExerciseData(this.exercises.thisWeekExercises);
      this.exerciseChart.data.datasets[0].label = 'Esta semana';
      this.exerciseChart.data.datasets[1].data = this.getExerciseData(this.exercises.weekBeforeExercises);
      this.exerciseChart.data.datasets[1].label = 'Semana pasada';
      this.exerciseChart.update();
    } else {
      this.exerciseRange = 'Esta semana';
      this.exerciseChart.data.datasets[0].data = this.getExerciseData(this.exercises.thisMonthExercises);
      this.exerciseChart.data.datasets[0].label = 'Este mes';
      this.exerciseChart.data.datasets[1].data = this.getExerciseData(this.exercises.monthBeforeExercises);
      this.exerciseChart.data.datasets[1].label = 'Mes pasado';
      this.exerciseChart.update();
    }
  }

  getFoodData(meals) {
    let dataArray = [0, 0, 0];
    if (meals) {
      dataArray[0] = meals.breakfast;
      dataArray[1] = meals.lunch;
      dataArray[2] = meals.dinner;
    }
    return dataArray;
  }

  getExerciseData(exercises) {
    let dataArray = [0, 0, 0];
    if (exercises) {
      dataArray[0] = exercises.stretching;
      dataArray[1] = exercises.heart;
      dataArray[2] = exercises.strength;
    }
    return dataArray;
  }

}
