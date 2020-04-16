import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/models/alert';
import { AlertsService } from 'src/app/services/alerts/alerts.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  alerts: Alert;
  alertsCount: number;
  lastWatering: any;
  expiryProducts: any;
  lastExercise: any;
  lastRehearsal: any;
  lastWateringFarm: any;
  lastWateringFlo: any;
  cleaningTasks: any;
  today: Date;

  constructor(
    private _alertsService: AlertsService,
  ) { }

  ngOnInit(): void {
    this.today = new Date();
    this.lastWatering = [];
    this.expiryProducts = [];
    this.lastExercise = '';
    this.lastRehearsal = '';
    this.lastWateringFarm = '';
    this.lastWateringFlo = '';
    
    this._alertsService.getAlerts().subscribe(alerts => {
      this.alerts = alerts;
      for (let watering of alerts.lastWatering) {
        if (watering.watering[0] !== undefined) {
          if (this.getDifferenceInDays(this.today, new Date(watering.watering[0].date)) > watering.wateringFrequency) {
            this.lastWatering.push({ name: watering.name, date: watering.watering[0].date });
          }
        } else {
          this.lastWatering.push({ name: watering.name, date: '' });
        }
      }
      for (let foodProduct of alerts.foodProducts) {
        if (this.getDifferenceInDays(this.today, new Date(foodProduct.expiry)) > -3) {
          this.expiryProducts.push({ name: foodProduct.name, expiry: foodProduct.expiry });
        }
      }
      if (this.getDifferenceInDays(this.today, new Date(alerts.lastExercise[0].date)) > 3) {
        this.lastExercise = alerts.lastExercise;
      }
      if (this.getDifferenceInDays(this.today, new Date(alerts.lastRehearsal[0].date)) > 7) {
        this.lastRehearsal = alerts.lastRehearsal;
      }
      if (this.getDifferenceInDays(this.today, new Date(alerts.lastWateringFarm[0].date)) > 7) {
        this.lastWateringFarm = alerts.lastWateringFarm;
      }
      if (this.getDifferenceInDays(this.today, new Date(alerts.lastWateringFlo[0].date)) > 7) {
        this.lastWateringFlo = alerts.lastWateringFlo;
      }
      this.cleaningTasks = [
        { place: 'Garaje', task: 'Barrer', period: '4 meses' },
        { place: 'Garaje', task: 'Lavar el coche', period: '2 meses' },
        { place: 'Garaje', task: 'Fregar el suelo', period: '6 meses' },
        { place: 'Garaje', task: 'Quitar el polvo', period: '4 meses' },
        { place: 'Taller', task: 'Barrer', period: '3 meses'},
        { place: 'Taller', task: 'Fregar el suelo', period: '4 meses'},
        { place: 'Taller', task: 'Quitar el polvo', period: '3 meses'},
        { place: 'Bodega', task: 'Barrer', period: '2 meses'},
        { place: 'Bodega', task: 'Fregar el suelo', period: '4 meses'},
        { place: 'Bodega', task: 'Limpiar los cristales', period: '2 meses'},
        { place: 'Bodega', task: 'Quitar el polvo', period: '2 meses'},
        { place: 'Bodega', task: 'Limpiar el baño', period: '2 meses'},
        { place: 'Salón', task: 'Barrer', period: '1 mes'},
        { place: 'Salón', task: 'Fregar el suelo', period: '2 meses'},
        { place: 'Salón', task: 'Quitar el polvo', period: '1 mes'},
        { place: 'Salón', task: 'Pasar la aspiradora', period: '1 mes'},
        { place: 'Cocina', task: 'Barrer', period: '1 mes' },
        { place: 'Cocina', task: 'Fregar el suelo', period: '1 mes' },
        { place: 'Cocina', task: 'Tender la ropa', period: '1 semana' },
        { place: 'Cocina', task: 'Poner el lavavajillas', period: '1 semana' },
        { place: 'Cocina', task: 'Quitar el polvo', period: '1 mes' },
        { place: 'Cocina', task: 'Pasar la aspiradora', period: '1 mes' },
        { place: 'Cocina', task: 'Poner la lavadora', period: '1 semana' },
        { place: 'Habitación', task: 'Cambiar las sábanas', period: '2 semanas' },
        { place: 'Habitación', task: 'Barrer', period: '2 semanas' },
        { place: 'Habitación', task: 'Fregar el suelo', period: '2 meses' },
        { place: 'Habitación', task: 'Colocar la ropa', period: '2 semanas' },
        { place: 'Habitación', task: 'Limpiar los cristales', period: '1 mes' },
        { place: 'Habitación', task: 'Quitar el polvo', period: '2 semanas' },
        { place: 'Habitación', task: 'Limpiar el baño', period: '2 semanas' },
        { place: 'Habitación', task: 'Pasar la aspiradora', period: '2 semanas' },
        { place: 'Estudio', task: 'Barrer', period: '2 semanas' },
        { place: 'Estudio', task: 'Fregar el suelo', period: '2 meses' },
        { place: 'Estudio', task: 'Limpiar los cristales', period: '1 mes' },
        { place: 'Estudio', task: 'Quitar el polvo', period: '2 semanas' },
        { place: 'Estudio', task: 'Limpiar el baño', period: '2 meses' },
        { place: 'Estudio', task: 'Pasar la aspiradora', period: '2 semanas' },
        { place: 'Ático', task: 'Barrer', period: '1 mes' },
        { place: 'Ático', task: 'Fregar el suelo', period: '2 meses' },
        { place: 'Ático', task: 'Limpiar los cristales', period: '2 meses' },
        { place: 'Ático', task: 'Quitar el polvo', period: '1 mes' },
        { place: 'Ático', task: 'Limpiar el baño', period: '2 meses' },
        { place: 'Ático', task: 'Pasar la aspiradora', period: '1 mes' },
        { place: 'Terraza Norte', task: 'Barrer', period: '3 meses' },
        { place: 'Terraza Norte', task: 'Fregar el suelo', period: '4 meses' },
        { place: 'Terraza Norte', task: 'Limpiar cristales', period: '1 año' },
        { place: 'Terraza Sur', task: 'Barrer', period: '3 meses' },
        { place: 'Terraza Sur', task: 'Fregar el suelo', period: '4 meses' },
        { place: 'Terraza Sur', task: 'Limpiar los cristales', period: '1 año' },
        { place: 'Escaleras', task: 'Barrer', period: '1 mes' },
        { place: 'Escaleras', task: 'Fregar el suelo', period: '2 meses' },
        { place: 'Escaleras', task: 'Limpiar los cristales', period: '1 mes' },
        { place: 'Escaleras', task: 'Quitar el polvo', period: '2 meses' },
        { place: 'Escaleras', task: 'Limpiar el baño', period: '2 meses' },
        { place: 'Escaleras', task: 'Pasar la aspiradora', period: '1 mes' },
      ];
      let indexes = [];
      for (let cleaningTask of alerts.cleaningTasks) {
        switch (cleaningTask.place) {
          case 'Garaje':
            for (let task of cleaningTask.tasks) {
              switch (task) {
                case 'broom':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 121) {
                    indexes.push(0);
                  }
                  break;
                case 'carwash':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 61) {
                    indexes.push(1);
                  }
                  break;
                case 'cleaningkit':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 181) {
                    indexes.push(2);
                  }
                  break;
                case 'duster':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 121) {
                    indexes.push(3);
                  }
                  break;
                default:
                  console.log('Error');
              }
            }
            break;
          case 'Taller':
            for (let task of cleaningTask.tasks) {
              switch (task) {
                case 'broom':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 91) {
                    indexes.push(4);
                  }
                  break;
                case 'cleaningkit':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 121) {
                    indexes.push(5);
                  }
                  break;
                case 'duster':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 91) {
                    indexes.push(6);
                  }
                  break;
                default:
                  console.log('Error');
              }
            }
            break;
          case 'Bodega':
            for (let task of cleaningTask.tasks) {
              switch (task) {
                case 'broom':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 61) {
                    indexes.push(7);
                  }
                  break;
                case 'cleaningkit':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 121) {
                    indexes.push(8);
                  }
                  break;
                case 'desinfectant':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 61) {
                    indexes.push(9);
                  }
                  break;
                case 'duster':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 61) {
                    indexes.push(10);
                  }
                  break;
                case 'sponge':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 61) {
                    indexes.push(11);
                  }
                  break;
                default:
                  console.log('Error');
              }
            }
            break;
          case 'Salón':
            for (let task of cleaningTask.tasks) {
              switch (task) {
                case 'broom':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 31) {
                    indexes.push(12);
                    indexes.push(15);
                  }
                  break;
                case 'cleaningkit':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 61) {
                    indexes.push(13);
                  }
                  break;
                case 'duster':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 31) {
                    indexes.push(14);
                  }
                  break;
                case 'iron':
                  break;
                case 'vacuum':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 31) {
                    indexes.push(15);
                    indexes.push(12);
                  }
                  break;
                default:
                  console.log('Error');
              }
            }
            break;
          case 'Cocina':
            for (let task of cleaningTask.tasks) {
              switch (task) {
                case 'broom':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 31) {
                    indexes.push(16);
                    indexes.push(21);
                  }
                  break;
                case 'cleaningkit':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 31) {
                    indexes.push(17);
                  }
                  break;
                case 'clothespeg':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 8) {
                    indexes.push(18);
                  }
                  break;
                case 'dishwasher':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 8) {
                    indexes.push(19);
                  }
                  break;
                case 'duster':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 31) {
                    indexes.push(20);
                  }
                  break;
                case 'vacuum':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 31) {
                    indexes.push(21);
                    indexes.push(16);
                  }
                  break;
                case 'washingmachine':
                  console.log('washingmachine');
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 8) {
                    indexes.push(22);
                  }
                  break;
                default:
                  console.log('Error - ' + task);
              }
            }
            break;
          case 'Habitación':
            for (let task of cleaningTask.tasks) {
              switch (task) {
                case 'bed':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 15) {
                    indexes.push(23);
                  }
                  break;
                case 'broom':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 15) {
                    indexes.push(24);
                    indexes.push(30);
                  }
                  break;
                case 'cleaningkit':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 61) {
                    indexes.push(25);
                  }
                  break;
                case 'clothes':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 15) {
                    indexes.push(26);
                  }
                  break;
                case 'desinfectant':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 31) {
                    indexes.push(27);
                  }
                  break;
                case 'duster':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 15) {
                    indexes.push(28);
                  }
                  break;
                case 'sponge':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 15) {
                    indexes.push(29);
                  }
                  break;
                case 'vacuum':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 15) {
                    indexes.push(30);
                    indexes.push(24);
                  }
                  break;
                default:
                  console.log('Error');
              }
            }
            break;
          case 'Estudio':
            for (let task of cleaningTask.tasks) {
              switch (task) {
                case 'broom':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 15) {
                    indexes.push(31);
                    indexes.push(36);
                  }
                  break;
                case 'cleaningkit':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 61) {
                    indexes.push(32);
                  }
                  break;
                case 'desinfectant':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 61) {
                    indexes.push(33);
                  }
                  break;
                case 'duster':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 15) {
                    indexes.push(34);
                  }
                  break;
                case 'sponge':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 61) {
                    indexes.push(35);
                  }
                  break;
                case 'vacuum':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 15) {
                    indexes.push(36);
                    indexes.push(31);
                  }
                  break;
                default:
                  console.log('Error');
              }
            }
            break;
          case 'Ático':
            for (let task of cleaningTask.tasks) {
              switch (task) {
                case 'broom':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 31) {
                    indexes.push(37);
                    indexes.push(42);
                  }
                  break;
                case 'cleaningkit':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 61) {
                    indexes.push(38);
                  }
                  break;
                case 'desinfectant':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 61) {
                    indexes.push(39);
                  }
                  break;
                case 'duster':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 31) {
                    indexes.push(40);
                  }
                  break;
                case 'sponge':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 61) {
                    indexes.push(41);
                  }
                  break;
                case 'vacuum':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 31) {
                    indexes.push(42);
                    indexes.push(37);
                  }
                  break;
                default:
                  console.log('Error');
              }
            }
            break;
          case 'Terraza norte':
            for (let task of cleaningTask.tasks) {
              switch (task) {
                case 'broom':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 91) {
                    indexes.push(43);
                  }
                  break;
                case 'cleaningkit':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 121) {
                    indexes.push(44);
                  }
                  break;
                case 'desinfectant':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 366) {
                    indexes.push(45);
                  }
                  break;
                default:
                  console.log('Error');
              }
            }
            break;
          case 'Terraza sur':
            for (let task of cleaningTask.tasks) {
              switch (task) {
                case 'broom':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 91) {
                    indexes.push(46);
                  }
                  break;
                case 'cleaningkit':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 121) {
                    indexes.push(47);
                  }
                  break;
                case 'desinfectant':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 366) {
                    indexes.push(48);
                  }
                  break;
                default:
                  console.log('Error');
              }
            }
            break;
          case 'Escaleras':
            for (let task of cleaningTask.tasks) {
              switch (task) {
                case 'broom':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 31) {
                    indexes.push(49);
                    indexes.push(54);
                  }
                  break;
                case 'cleaningkit':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 61) {
                    indexes.push(50);
                  }
                  break;
                case 'desinfectant':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 31) {
                    indexes.push(51);
                  }
                  break;
                case 'duster':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 61) {
                    indexes.push(52);
                  }
                  break;
                case 'sponge':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 61) {
                    indexes.push(53);
                  }
                  break;
                case 'vacuum':
                  if (this.getDifferenceInDays(this.today, new Date(cleaningTask.date)) < 31) {
                    indexes.push(54);
                    indexes.push(49);
                  }
                  break;
                default:
                  console.log('Error');
              }
            }
            break;
          default:
            console.log('Error');
        }
      }
      indexes = indexes.sort();
      for (let i = indexes.length -1; i >= 0; i--) {
        this.cleaningTasks.splice(indexes[i], 1);
      }
      this.alertsCount = this.cleaningTasks.length + this.lastWatering.length + this.lastRehearsal.length 
      + this.lastWateringFarm.length + this.expiryProducts.length + this.lastWateringFlo.length + this.lastExercise.length;
    });
  }

  getDifferenceInDays(date1, date2) {
    var diff = date1.getTime() - date2.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  }

}
