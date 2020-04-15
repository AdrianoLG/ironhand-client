import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';

export interface Parts {
  part: string;
  count: number;
}

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss']
})
export class HouseComponent implements OnInit {
  @ViewChild('cleaning') cleaning: ElementRef;
  cleaningTasksLastWeek: any;
  homeParts: Array<Parts>;
  
  constructor(
    private _statisticsService: StatisticsService
  ) { }

  ngOnInit(): void {
    this.cleaningTasksLastWeek = [];
    this.homeParts = [
      { part: 'bodega', count: 0 },
      { part: 'garaje', count: 0 },
      { part: 'taller', count: 0 },
      { part: 'cocina', count: 0 },
      { part: 'salon', count: 0 },
      { part: 'habitacion', count: 0 },
      { part: 'estudio', count: 0 },
      { part: 'atico', count: 0 },
      { part: 'terrazaNorte', count: 0 },
      { part: 'terrazaSur', count: 0 },
      { part: 'escaleras', count: 0 },
    ];

    this._statisticsService.getStatistics().subscribe(statistics => {
      this.cleaningTasksLastWeek = statistics.cleaningTasksSinceLastWeek;
      for (let cleaningTask of this.cleaningTasksLastWeek) {
        switch (cleaningTask.place) {
          case 'Bodega':
            this.homeParts[0].count = this.homeParts[0].count + cleaningTask.tasks.length;
            break;
          case 'Garaje':
            this.homeParts[1].count = this.homeParts[1].count + cleaningTask.tasks.length;
            break;
          case 'Taller':
            this.homeParts[2].count = this.homeParts[2].count + cleaningTask.tasks.length;
            break;
          case 'Cocina':
            this.homeParts[3].count = this.homeParts[3].count + cleaningTask.tasks.length;
            break;
          case 'Salón':
            this.homeParts[4].count = this.homeParts[4].count + cleaningTask.tasks.length;
            break;
          case 'Habitación':
            this.homeParts[5].count = this.homeParts[5].count + cleaningTask.tasks.length;
            break;
          case 'Estudio':
            this.homeParts[6].count = this.homeParts[6].count + cleaningTask.tasks.length;
            break;
          case 'Ático':
            this.homeParts[7].count = this.homeParts[7].count + cleaningTask.tasks.length;
            break;
          case 'Terraza Norte':
            this.homeParts[8].count = this.homeParts[8].count + cleaningTask.tasks.length;
            break;
          case 'Terraza Sur':
            this.homeParts[9].count = this.homeParts[9].count + cleaningTask.tasks.length;
            break;
          case 'Escaleras':
            this.homeParts[10].count = this.homeParts[10].count + cleaningTask.tasks.length;
            break;
          default:
            console.log('Error - ' + cleaningTask.place);
        }
      }
      if (this.homeParts[0].count < 5) {
        this.cleaning.nativeElement.children[0].children.bodega.classList.add('lvl' + this.homeParts[0].count);
      } else {
        this.cleaning.nativeElement.children[0].children.bodega.classList.add('lvl5');
      }
      if (this.homeParts[1].count < 5) {
        this.cleaning.nativeElement.children[0].children.garaje.classList.add('lvl' + this.homeParts[1].count);
      } else {
        this.cleaning.nativeElement.children[0].children.garaje.classList.add('lvl5');
      }
      if (this.homeParts[2].count < 5) {
        this.cleaning.nativeElement.children[0].children.taller.classList.add('lvl' + this.homeParts[2].count);
      } else {
        this.cleaning.nativeElement.children[0].children.taller.classList.add('lvl5');
      }
      if (this.homeParts[3].count < 5) {
        this.cleaning.nativeElement.children[0].children.cocina.classList.add('lvl' + this.homeParts[3].count);
      } else {
        this.cleaning.nativeElement.children[0].children.cocina.classList.add('lvl5');
      }
      if (this.homeParts[4].count < 5) {
        this.cleaning.nativeElement.children[0].children.salon.classList.add('lvl' + this.homeParts[4].count);
      } else {
        this.cleaning.nativeElement.children[0].children.salon.classList.add('lvl5');
      }
      if (this.homeParts[5].count < 5) {
        this.cleaning.nativeElement.children[0].children.habitacion.classList.add('lvl' + this.homeParts[5].count);
      } else {
        this.cleaning.nativeElement.children[0].children.habitacion.classList.add('lvl5');
      }
      if (this.homeParts[6].count < 5) {
        this.cleaning.nativeElement.children[0].children.estudio.classList.add('lvl' + this.homeParts[6].count);
      } else {
        this.cleaning.nativeElement.children[0].children.estudio.classList.add('lvl5');
      }
      if (this.homeParts[7].count < 5) {
        this.cleaning.nativeElement.children[0].children.atico.classList.add('lvl' + this.homeParts[7].count);
      } else {
        this.cleaning.nativeElement.children[0].children.atico.classList.add('lvl5');
      }
      if (this.homeParts[8].count < 5) {
        this.cleaning.nativeElement.children[0].children.terrazaNorte.classList.add('lvl' + this.homeParts[8].count);
      } else {
        this.cleaning.nativeElement.children[0].children.terrazaNorte.classList.add('lvl5');
      }
      if (this.homeParts[9].count < 5) {
        this.cleaning.nativeElement.children[0].children.terrazaSur.classList.add('lvl' + this.homeParts[9].count);
      } else {
        this.cleaning.nativeElement.children[0].children.terrazaSur.classList.add('lvl5');
      }
      if (this.homeParts[10].count < 5) {
        this.cleaning.nativeElement.children[0].children.escaleras.classList.add('lvl' + this.homeParts[10].count);
      } else {
        this.cleaning.nativeElement.children[0].children.escaleras.classList.add('lvl5');
      }
    });

  }

}
