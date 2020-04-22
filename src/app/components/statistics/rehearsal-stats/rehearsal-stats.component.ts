import { Component, OnInit } from '@angular/core';
import { RehearsalsService } from 'src/app/services/rehearsals/rehearsals.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-rehearsal-stats',
  templateUrl: './rehearsal-stats.component.html',
  styleUrls: ['./rehearsal-stats.component.scss']
})
export class RehearsalStatsComponent implements OnInit {
  rehearsalsCalled: boolean;
  today: Date;
  songsRange: string;
  songsLabel: string;
  songsLastLabel: string;
  instrumentsRange: string;
  instrumentsChart: any;
  instrumentsChartLast: any;
  rehearsals: any;
  songs: any;
  songsLast: any;
  instrumentsChartTitle: string;

  constructor(
    private _rehearsalsService: RehearsalsService
  ) { }

  ngOnInit(): void {
    this.rehearsalsCalled = false;
    this.today = new Date();
    this.songsRange = 'Este mes';
    this.songsLabel = 'Esta semana';
    this.songsLastLabel = 'Semana pasada';
    this.instrumentsRange = 'Este mes';
    this.instrumentsChartTitle = 'Esta semana/Semana pasada';
    this.songs = [];
    this.songsLast = [];
    // This week
    this.instrumentsChart = new Chart('instrumentsChart', {
      type: 'doughnut',
      data: {
          labels: [ 'Piano', 'Guitarra', 'Bajo', 'Batería', 'MKII', 'Ninguno' ],
          datasets: [
            {
              data: [0, 0, 0, 0, 0, 1],
              backgroundColor: [
                '#c5cae9',
                '#ffccbc',
                '#b2dfdb',
                '#d7ccc8',
                '#f8bbd0',
                '#ebeced'
              ],
              fill: false
            }
          ]
      }
    });
    // Last week
    this.instrumentsChartLast = new Chart('instrumentsChartLast', {
      type: 'doughnut',
      data: {
        labels: [ 'Piano', 'Guitarra', 'Bajo', 'Batería', 'MKII', 'Ninguno' ],
        datasets: [
          {
            data: [0, 0, 0, 0, 0, 1],
            backgroundColor: [
              '#c5cae9',
              '#ffccbc',
              '#b2dfdb',
              '#d7ccc8',
              '#f8bbd0',
              '#ebeced'
            ],
            fill: false
          }
        ]
      },
      options: {
        legend: {
            display: false
        }
      }
    });
  }

  getRehearsal() {
    this._rehearsalsService.getRehearsals().subscribe(rehearsals => {
      let thisWeekRehearsal = {
        instrumentsData: [0, 0, 0, 0, 0, 1],
        sheets : []
      };
      
      let weekBeforeRehearsal = {
        instrumentsData: [0, 0, 0, 0, 0, 1],
        sheets : []
      };
      let thisMonthRehearsal = {
        instrumentsData: [0, 0, 0, 0, 0, 1],
        sheets : []
      };
      let monthBeforeRehearsal = {
        instrumentsData: [0, 0, 0, 0, 0, 1],
        sheets : []
      };
      for (let rehearsal of rehearsals.rehearsals) {
        let date = new Date(rehearsal.date);
        let daysPassed = this.getDifferenceInDays(this.today, date);
        if (daysPassed < 8) {
          thisWeekRehearsal = this.countRehearsal(thisWeekRehearsal, rehearsal);
        } else if (daysPassed >= 8 && daysPassed < 15) {
          weekBeforeRehearsal = this.countRehearsal(weekBeforeRehearsal, rehearsal);
        }
        if (daysPassed < 31) {
          thisMonthRehearsal = this.countRehearsal(thisMonthRehearsal, rehearsal);
        } else if (daysPassed >= 31 && daysPassed < 61) {
          monthBeforeRehearsal = this.countRehearsal(monthBeforeRehearsal, rehearsal);
        }
        if (daysPassed >= 31) {
          break;
        }
      }
      this.rehearsals = {
        thisWeekRehearsal: thisWeekRehearsal,
        weekBeforeRehearsal: weekBeforeRehearsal,
        thisMonthRehearsal: thisMonthRehearsal,
        monthBeforeRehearsal: monthBeforeRehearsal
      }
      console.log(this.rehearsals);
      // this.songsChart.data.datasets[0].data = this.rehearsals.this
      // this.exerciseChart.data.datasets[0].data = this.getExerciseData(this.exercises.thisWeekExercises);
      // this.exerciseChart.data.datasets[1].data = this.getExerciseData(this.exercises.weekBeforeExercises);
      // this.exerciseChart.update();
      this.songs = this.rehearsals.thisWeekRehearsal.sheets;
      this.songsLast = this.rehearsals.weekBeforeRehearsal.sheets;
      this.instrumentsChart.data.datasets[0].data = this.rehearsals.thisWeekRehearsal.instrumentsData;
      this.instrumentsChartLast.data.datasets[0].data = this.rehearsals.weekBeforeRehearsal.instrumentsData;
      this.instrumentsChart.update();
      this.instrumentsChartLast.update();
    });
  }

  getDifferenceInDays(date1, date2) {
    var diff = date1.getTime() - date2.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  }

  countRehearsal(rehearsals, rehearsal) {
    rehearsals.instrumentsData[5] = 0;
    switch (rehearsal.instrument) {
      case 'Piano':
        rehearsals.instrumentsData[0] += rehearsal.time;
        break;
      case 'Guitarra':
        rehearsals.instrumentsData[1] += rehearsal.time;
        break;
      case 'Bajo':
        rehearsals.instrumentsData[2] += rehearsal.time;
        break;
      case 'Batería':
        rehearsals.instrumentsData[3] += rehearsal.time;
        break;
      case 'MKII':
        rehearsals.instrumentsData[4] += rehearsal.time;
        break;
      default:
        console.log(rehearsal.instrument);
    }
    if (rehearsal.sheets.length > 0) {
      for (let j = 0; j < rehearsal.sheets.length; j++) {
        let tempSheets = [];
        if (rehearsals.sheets.length > 0) {
          for (let i = 0; i < rehearsals.sheets.length; i++) {
            if (rehearsals.sheets[i].name === rehearsal.sheets[j].name) {
              rehearsals.sheets[i].time += rehearsal.sheets[j].time;
            } else {
              tempSheets.push({
                name: rehearsal.sheets[j].name,
                time: rehearsal.sheets[j].time
              });
            }
          }
          rehearsals.sheets.push(tempSheets[0]);
        } else {
          rehearsals.sheets.push({
            name: rehearsal.sheets[j].name,
            time: rehearsal.sheets[j].time
          })
        }
      }
    }
    return rehearsals;
  }

  changeInstrumentsRange() {
    if (this.instrumentsRange === 'Esta semana') {
      this.instrumentsRange = 'Este mes';
      this.instrumentsChartTitle = 'Esta semana/Semana pasada';
      this.instrumentsChart.data.datasets[0].data = this.rehearsals.thisWeekRehearsal.instrumentsData;
      this.instrumentsChartLast.data.datasets[0].data = this.rehearsals.weekBeforeRehearsal.instrumentsData;
    } else {
      this.instrumentsRange = 'Esta semana';
      this.instrumentsChartTitle = 'Este mes/Mes pasado';
      this.instrumentsChart.data.datasets[0].data = this.rehearsals.thisMonthRehearsal.instrumentsData;
      this.instrumentsChartLast.data.datasets[0].data = this.rehearsals.monthBeforeRehearsal.instrumentsData;
    }
    this.instrumentsChart.update();
    this.instrumentsChartLast.update();
  }

  changeSongsRange() {
    if (this.songsRange === 'Esta semana') {
      this.songsRange = 'Este mes';
      this.songsLabel = 'Esta semana';
    this.songsLastLabel = 'Semana pasada';
      this.songs = this.rehearsals.thisWeekRehearsal.sheets;
      this.songsLast = this.rehearsals.weekBeforeRehearsal.sheets;
    } else {
      this.songsRange = 'Esta semana';
      this.songsLabel = 'Este mes';
    this.songsLastLabel = 'Mes pasado';
      this.songs = this.rehearsals.thisMonthRehearsal.sheets;
      this.songsLast = this.rehearsals.monthBeforeRehearsal.sheets;
    }
  }

}
