import { Component, OnInit, ViewChild } from '@angular/core';
import { CleanupService } from 'src/app/services/cleanup/cleanup.service';
import { PlantsService } from 'src/app/services/plants/plants.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-maintenance-stats',
  templateUrl: './maintenance-stats.component.html',
  styleUrls: ['./maintenance-stats.component.scss']
})
export class MaintenanceStatsComponent implements OnInit {
  cleanupCalled: boolean;
  plantsCalled: boolean;
  cleanups: any;
  today: Date;
  chart: any;
  alivePlants: number;
  plantsCount: number;
  range: string;

  constructor(
    private _cleanupService: CleanupService,
    private _plantsService: PlantsService
  ) { }

  ngOnInit(): void {
    this.cleanupCalled = false;
    this.plantsCalled = false;
    this.today = new Date();
    this.range = 'Este mes';
    this.alivePlants = 0;
    this.chart = new Chart('chart', {
      type: 'line',
      data: {
          labels: ['Bodega', 'Garaje', 'Taller', 'Cocina', 'Salón', 'Habitación', 'Estudio', 'Ático', 'Terraza N', 'Terraza S', 'Escaleras'],
          datasets: [
            {
              label: 'Tareas esta semana',
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              backgroundColor: 'rgba(183, 28, 28, .5)',
              borderColor: 'rgba(183, 28, 28, .5)',
              fill: false
            },
            {
              label: 'Tareas semana pasada',
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              backgroundColor: 'rgba(38, 50, 56, .5)',
              borderColor: 'rgba(38, 50, 56, .5)',
              fill: false
            }
          ]
      }
    });
  }

  getMaintenance() {
    if (!this.cleanupCalled) {
      this._cleanupService.getCleanups().subscribe(cleanups => {
        let thisWeekTasks = [];
        let weekBeforeTasks = [];
        let thisMonthTasks = [];
        let monthBeforeTasks = [];
        for (let cleanup of cleanups.cleaningTasks) {
          let date = new Date(cleanup.date);
          let daysPassed = this.getDifferenceInDays(this.today, date);
          if (daysPassed < 8) {
            thisWeekTasks = this.countTasks(thisWeekTasks, cleanup);
          } else if (daysPassed >= 8 && daysPassed < 15) {
            weekBeforeTasks = this.countTasks(weekBeforeTasks, cleanup);
          }
          if (daysPassed < 31) {
            thisMonthTasks = this.countTasks(thisMonthTasks, cleanup);
          } else if (daysPassed >= 31 && daysPassed < 61) {
            monthBeforeTasks = this.countTasks(monthBeforeTasks, cleanup);
          }
        }
        this.cleanups = {
          thisWeekTasks: thisWeekTasks,
          weekBeforeTasks: weekBeforeTasks,
          thisMonthTasks: thisMonthTasks,
          monthBeforeTasks: monthBeforeTasks
        };
        this.chart.data.datasets[0].data = this.getData(this.cleanups.thisWeekTasks);
        this.chart.data.datasets[1].data = this.getData(this.cleanups.weekBeforeTasks);
        this.chart.update();
      });
    }
    if (!this.plantsCalled) {
      this._plantsService.getPlants().subscribe(plants => {
        this.plantsCount = plants.count;
        for (let plant of plants.plants) {
          console.log(plant.death);
          if (!plant.death) {
            this.alivePlants++;
          }
        }
      });
    }
  }

  getDifferenceInDays(date1, date2) {
    var diff = date1.getTime() - date2.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  }

  countTasks(tasks, cleanup) {
    let found = -1;
    let i = 0;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].place === cleanup.place) {
        found = i;
      }
    }
    if (found == -1) {
      tasks.push({
        place: cleanup.place,
        count: cleanup.tasks.length
      });
    } else {
      tasks[found].count = tasks[found].count + cleanup.tasks.length;
    }
    return tasks;
  }

  getData(tasks) {
    let dataArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let task of tasks) {
      switch (task.place) {
        case 'Bodega':
          dataArray[0] = task.count;
          break;
        case 'Garaje':
          dataArray[1] = task.count;
          break;
        case 'Taller':
          dataArray[2] = task.count;
          break;
        case 'Cocina':
          dataArray[3] = task.count;
          break;
        case 'Salón':
          dataArray[4] = task.count;
          break;
        case 'Habitación':
          dataArray[5] = task.count;
          break;
        case 'Estudio':
          dataArray[6] = task.count;
          break;
        case 'Ático':
          dataArray[7] = task.count;
          break;
        case 'Terraza Norte':
          dataArray[8] = task.count;
          break;
        case 'Terraza Sur':
          dataArray[9] = task.count;
          break;
        case 'Escaleras':
          dataArray[10] = task.count;
          break;
        default:
          console.log('Error: ' + task.place);
      }
    }
    return dataArray;
  }

  changeRange() {
    if (this.range === 'Esta semana') {
      this.range = 'Este mes';
      this.chart.data.datasets[0].data = this.getData(this.cleanups.thisWeekTasks);
      this.chart.data.datasets[0].label = 'Tareas esta semana';
      this.chart.data.datasets[1].data = this.getData(this.cleanups.weekBeforeTasks);
      this.chart.data.datasets[1].label = 'Tareas semana pasada';
      this.chart.update();
    } else {
      this.range = 'Esta semana';
      this.chart.data.datasets[0].data = this.getData(this.cleanups.thisMonthTasks);
      this.chart.data.datasets[0].label = 'Tareas este mes';
      this.chart.data.datasets[1].data = this.getData(this.cleanups.monthBeforeTasks);
      this.chart.data.datasets[1].label = 'Tareas mes pasado';
      this.chart.update();
    }
  }

}
