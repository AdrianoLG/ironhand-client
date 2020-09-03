import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';
import { Statistics } from 'src/app/models/statistics';

export interface Parts {
  part: string;
  count: number;
}

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  @ViewChild('body') body: ElementRef;
  @ViewChild('heart') heart: ElementRef;
  @ViewChild('stretch') stretch: ElementRef;
  bodyParts: Array<Parts>;
  heartCount: number;
  stretchCount: number;

  constructor(
    private _statisticsService: StatisticsService
  ) { }

  ngOnInit(): void {
    this.bodyParts = [
      { part: 'cuello', count: 0 },
      { part: 'hombros', count: 0 },
      { part: 'pecho', count: 0 },
      { part: 'espalda', count: 0 },
      { part: 'biceps', count: 0 },
      { part: 'triceps', count: 0 },
      { part: 'antebrazos', count: 0 },
      { part: 'manos', count: 0 },
      { part: 'abdominales', count: 0 },
      { part: 'gluteos', count: 0 },
      { part: 'cuadriceps', count: 0 },
      { part: 'gemelos', count: 0 },
      { part: 'pies', count: 0 },
      { part: 'muslos', count: 0 }
    ];
    this.heartCount = 0;
    this.stretchCount = 0;

    this._statisticsService.getStatistics().subscribe(statistics => {
      for (let exercise of statistics.exercises) {
        for (let completed of statistics.completedExercisesSinceLastWeek) {
          if (completed.exerciseId == exercise._id) {
            if (exercise.category == 'Fuerza') {
              for (let part of exercise.bodyParts) {
                switch (part) {
                  case "Cuello":
                    this.bodyParts[0].count = this.bodyParts[0].count + 1;
                    break;
                  case "Hombros":
                    this.bodyParts[1].count = this.bodyParts[1].count + 1;
                    break;
                  case "Pecho":
                    this.bodyParts[2].count = this.bodyParts[2].count + 1;
                    break;
                  case "Espalda":
                    this.bodyParts[3].count = this.bodyParts[3].count + 1;
                    break;
                  case "Bíceps":
                    this.bodyParts[4].count = this.bodyParts[4].count + 1;
                    break;
                  case "Tríceps":
                    this.bodyParts[5].count = this.bodyParts[5].count + 1;
                    break;
                  case "Antebrazos":
                    this.bodyParts[6].count = this.bodyParts[6].count + 1;
                    break;
                  case "Manos":
                    this.bodyParts[7].count = this.bodyParts[7].count + 1;
                    break;
                  case "Abdominales":
                    this.bodyParts[8].count = this.bodyParts[8].count + 1;
                  case "Glúteos":
                    this.bodyParts[9].count = this.bodyParts[9].count + 1;
                    break;
                  case "Cuádriceps":
                    this.bodyParts[10].count = this.bodyParts[10].count + 1;
                    break;
                  case "Gemelos":
                    this.bodyParts[11].count = this.bodyParts[11].count + 1;
                    break;
                  case "Pies":
                    this.bodyParts[12].count = this.bodyParts[12].count + 1;
                    break;
                  case "Glúteos":
                    this.bodyParts[13].count = this.bodyParts[13].count + 1;
                    break;
                  case "Muslos":
                    this.bodyParts[14].count = this.bodyParts[14].count + 1;
                    break;
                  default:
                    console.log('Error: ' + part);
                }
              }
            } else if (exercise.category == 'Cardio') {
              if (exercise.name == 'Saltar a la cuerda') {
                this.heartCount = this.heartCount + 3;
              } else if (exercise.name == 'Bicicleta estática') {
                this.heartCount++;
              } else {
                this.heartCount++;
              }
            } else if (exercise.category == 'Estiramiento') {
              this.stretchCount++;
            }
          }
        }
      }
      if (this.heartCount < 5) {
        this.heart.nativeElement.children[0].classList.add('lvl' + this.heartCount);
      } else {
        this.heart.nativeElement.children[0].classList.add('lvl5');
      }
      if (this.stretchCount < 5) {
        this.stretch.nativeElement.children[0].classList.add('lvl' + this.stretchCount);
      } else {
        this.stretch.nativeElement.children[0].classList.add('lvl5');
      }
      for (let body of this.bodyParts) {
        switch (body.part) {
          case 'cuello':
            if (body.count < 5) {
              this.body.nativeElement.children[0].children[0].children.cuello.classList.add('lvl' + body.count);
            } else {
              this.body.nativeElement.children[0].children[0].children.cuello.classList.add('lvl5');
            }
            break;
          case 'hombros':
            if (body.count < 5) {
              this.body.nativeElement.children[0].children[0].children.hombros.classList.add('lvl' + body.count);
            } else {
              this.body.nativeElement.children[0].children[0].children.hombros.classList.add('lvl5');
            }
            break;
          case 'pecho':
            if (body.count < 5) {
              this.body.nativeElement.children[0].children[0].children.pecho.classList.add('lvl' + body.count);
            } else {
              this.body.nativeElement.children[0].children[0].children.pecho.classList.add('lvl5');
            }
            break;
          case 'espalda':
            if (body.count < 5) {
              this.body.nativeElement.children[0].children[0].children.espalda.classList.add('lvl' + body.count);
            } else {
              this.body.nativeElement.children[0].children[0].children.espalda.classList.add('lvl5');
            }
            break;
          case 'biceps':
            if (body.count < 5) {
              this.body.nativeElement.children[0].children[0].children.biceps.classList.add('lvl' + body.count);
            } else {
              this.body.nativeElement.children[0].children[0].children.biceps.classList.add('lvl5');
            }
            break;
          case 'triceps':
            if (body.count < 5) {
              this.body.nativeElement.children[0].children[0].children.triceps.classList.add('lvl' + body.count);
            } else {
              this.body.nativeElement.children[0].children[0].children.triceps.classList.add('lvl5');
            }
            break;
          case 'antebrazos':
            if (body.count < 5) {
              this.body.nativeElement.children[0].children[0].children.antebrazos.classList.add('lvl' + body.count);
            } else {
              this.body.nativeElement.children[0].children[0].children.antebrazos.classList.add('lvl5');
            }
            break;
          case 'abdominales':
            if (body.count < 5) {
              this.body.nativeElement.children[0].children[0].children.abdominales.classList.add('lvl' + body.count);
            } else {
              this.body.nativeElement.children[0].children[0].children.abdominales.classList.add('lvl5');
            }
            break;
          case 'manos':
            if (body.count < 5) {
              this.body.nativeElement.children[0].children[0].children.manos.classList.add('lvl' + body.count);
            } else {
              this.body.nativeElement.children[0].children[0].children.manos.classList.add('lvl5');
            }
            break;
          case 'gluteos':
            if (body.count < 5) {
              this.body.nativeElement.children[0].children[0].children.gluteos.classList.add('lvl' + body.count);
            } else {
              this.body.nativeElement.children[0].children[0].children.gluteos.classList.add('lvl5');
            }
            break;
          case 'muslos':
            if (body.count < 5) {
              this.body.nativeElement.children[0].children[0].children.muslos.classList.add('lvl' + body.count);
            } else {
              this.body.nativeElement.children[0].children[0].children.muslos.classList.add('lvl5');
            }
            break;
          case 'cuadriceps':
            if (body.count < 5) {
              this.body.nativeElement.children[0].children[0].children.cuadriceps.classList.add('lvl' + body.count);
            } else {
              this.body.nativeElement.children[0].children[0].children.cuadriceps.classList.add('lvl5');
            }
            break;
          case 'gemelos':
            if (body.count < 5) {
              this.body.nativeElement.children[0].children[0].children.gemelos.classList.add('lvl' + body.count);
            } else {
              this.body.nativeElement.children[0].children[0].children.gemelos.classList.add('lvl5');
            }
            break;
          case 'pies':
            if (body.count < 5) {
              this.body.nativeElement.children[0].children[0].children.pies.classList.add('lvl' + body.count);
            } else {
              this.body.nativeElement.children[0].children[0].children.pies.classList.add('lvl5');
            }
            break;
          default:
            console.log(body.part);
        }
      }
    }
  )}
}
