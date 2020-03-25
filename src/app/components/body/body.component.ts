import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MealsService } from 'src/app/services/meals/meals.service';
import { Meals } from 'src/app/models/meals';
import { CompletedExercise } from 'src/app/models/completed-exercise';
import { ExercisesService } from 'src/app/services/exercises/exercises.service';
import { SuggestionsService } from 'src/app/services/suggestions/suggestions.service';
import { Suggestion } from 'src/app/models/suggestion';
import { SelectedTabService, Tab } from 'src/app/services/tabs/selected-tab.service';
import { CompletedExercisesService } from 'src/app/services/completed-exercises/completed-exercises.service';
import { Exercise } from 'src/app/models/exercise';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BodyComponent implements OnInit {
  selectedIndex: number;
  selectedIndex2: number;
  selectedIndex3: number;
  currentTabs: Tab[];
  tabGroup: number;
  meals: Meals[];
  mealsCount: number;
  suggestions: Suggestion[];
  suggestionsCount: number;
  completedExercises: CompletedExercise[];
  completedExercisesCount: number;
  exercises: Exercise[];
  exercisesCount: number;
  submitted = false;
  completedExercisesMixed = [];
  seasons: Array<string>;
  selectedSeason: string;

  constructor(
    private _selectedTabService: SelectedTabService,
    private _mealsService: MealsService,
    private _completedExercisesService: CompletedExercisesService,
    private _exercisesService: ExercisesService,
    private _suggestionsService: SuggestionsService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._selectedTabService.currentTabs.subscribe(currentTabs => {
      this.currentTabs = currentTabs;
      for (const currentTab of currentTabs) {
        if (currentTab.name === 'body') {
          this.tabGroup = currentTabs.indexOf(currentTab);
          this.selectedIndex = currentTab.selected;
          this.selectedIndex2 = 0;
        }
      }
    });
    this.getFoodMeals();
    this.getCompletedExercises();
    this.getSuggestions();
    this.getExercises();
    this.seasons = ['Primavera', 'Verano', 'Otoño', 'Invierno'];
    this.selectedSeason = this.defaultSeason();
  }

  getFoodMeals(): void {
    this._mealsService.getMeals().subscribe(meals => {
      this.mealsCount = meals.count;
      this.meals = meals.meals;
    }, error => {
      if (error.status === 401) {
        this._router.navigate(['/login']);
      }
    });
  }

  getSuggestions(): void {
    this._suggestionsService.getSuggestions().subscribe(suggestions => {
      this.suggestionsCount = suggestions.count;
      this.suggestions = suggestions.suggestions;
    }, error => {
      if (error.status === 401) {
        this._router.navigate(['/login']);
      }
    });
  }

  getCompletedExercises(): void {
    this._completedExercisesService.getCompletedExercises().subscribe(completedExercises => {
      this.completedExercisesCount = completedExercises.count;
      this.completedExercises = completedExercises.completedExercises;
      this._exercisesService.getExercises().subscribe(exercises => {
        for (let exercise of exercises.exercises) {
          for (let completedExercise of this.completedExercises) {
            if (completedExercise.exerciseId == exercise._id) {
              this.completedExercisesMixed.push({
                _id: completedExercise._id,
                exerciseId: completedExercise.exerciseId,
                exerciseName: exercise.name,
                date: completedExercise.date,
                repetitions: completedExercise.repetitions,
                time: completedExercise.time,
                minHeart: completedExercise.minHeart,
                maxHeart: completedExercise.maxHeart
              });
            }
          }
        }
        this.completedExercisesMixed.sort((a, b) => b.date.localeCompare(a.date));
      });
    }, error => {
      if (error.status === 401) {
        this._router.navigate(['login']);
      }
    });
  }

  getExercises(): void {
    this._exercisesService.getExercises().subscribe(exercises => {
      this.exercisesCount = exercises.count;
      this.exercises = exercises.exercises;
    }, error => {
      if (error.status === 401) {
        this._router.navigate(['login']);
      }
    });
  }

  addSomething(): void {
    switch (this.selectedIndex) {
      case 0:
        if (this.selectedIndex2 === 0) {
          this._router.navigate(['cuerpo/comida/comidas/crear']);
        } else if (this.selectedIndex2 === 1) {
          this._router.navigate(['cuerpo/comida/sugerencias/crear']);
        } else {
          console.log('Something wrong');
        }
        break;
      case 1:
        if (this.selectedIndex2 === 0) {
          this._router.navigate(['cuerpo/ejercicio/completados/crear']);
        } else if (this.selectedIndex2 === 1) {
          this._router.navigate(['cuerpo/ejercicio/listado/crear']);
        } else {
          console.log('Something wrong');
        }
        break;
      default:
        console.log('No more cases. Check the code.');
    }
  }

  changeSelectedIndex($event): void {
    const tabIndex = $event.index;
    this.selectedIndex = tabIndex;
    this.currentTabs[this.tabGroup].selected = tabIndex;
    this._selectedTabService.changeTabs(this.currentTabs);
    console.log(`TabGroup ${this.tabGroup}, SelectedIndex ${this.selectedIndex}, OtherIndex ${this.selectedIndex2}`);
  }

  changeSelectedIndex2($event): void {
    this.selectedIndex2 = $event.index;
    console.log(`TabGroup ${this.tabGroup}, SelectedIndex ${this.selectedIndex}, OtherIndex ${this.selectedIndex2}`);
  }

  defaultSeason() {
    const today = new Date();
    const todayMonth = today.getMonth();
    const todayDay = today.getTime();
    let selectedSeason: string;
    if (todayMonth === 2) {
      selectedSeason = todayDay < 21 ? 'Invierno' : 'Primavera';
    } else if (todayMonth === 5) {
      selectedSeason = todayDay < 21 ? 'Primavera' : 'Verano';
    } else if (todayMonth === 8) {
      selectedSeason = todayDay < 23 ? 'Verano' : 'Otoño';
    } else if (todayMonth === 11) {
      selectedSeason = todayDay < 21 ? 'Otoño' : 'Invierno';
    } else if (todayMonth < 2) {
      selectedSeason = 'Invierno';
    } else if (todayMonth > 2 && todayMonth < 5) {
      selectedSeason = 'Primavera';
    } else if (todayMonth > 5 && todayMonth < 8) {
      selectedSeason = 'Primavera';
    } else if (todayMonth > 8 && todayMonth < 11) {
      selectedSeason = 'Primavera';
    }
    return selectedSeason;
  }

  changeSeason(season: string) {
    this.selectedSeason = season;
  }

  filterSuggestions(seasons: Array<string>) {
    for (const season of seasons) {
      if (season === this.selectedSeason) {
        return true;
      }
    }
    return false;
  }

}
