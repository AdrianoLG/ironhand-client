import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { JgWateringsService } from 'src/app/services/jg-waterings/jg-waterings.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-joy-garden-stats',
  templateUrl: './joy-garden-stats.component.html',
  styleUrls: ['./joy-garden-stats.component.scss']
})
export class JoyGardenStatsComponent implements OnInit {
  @ViewChild('wateringsFlo') wateringsFlo: ElementRef;
  @ViewChild('wateringsFarm') wateringsFarm: ElementRef;
  jgCalled: boolean;
  today: Date;
  waterings: any;
  wateringsContainer: string;
  wateringsButton: string;
  wateringsFloChart: any;
  wateringsFarmChart: any;

  constructor(
    private _jgWateringsService: JgWateringsService
  ) { }

  ngOnInit(): void {
    this.jgCalled = false;
    this.today = new Date();
    this.waterings = {
      aeroflo: {
        lastCrop: {
          grow: 0,
          flower: 0,
          root: 0,
          powerzyme: 0,
          supervit: 0,
          delta9: 0,
          boost: 0,
          pk1314: 0
        },
        penultimateCrop: {
          grow: 0,
          flower: 0,
          root: 0,
          powerzyme: 0,
          supervit: 0,
          delta9: 0,
          boost: 0,
          pk1314: 0
        }
      },
      aerofarm: {
        lastCrop: {
          grow: 0,
          flower: 0,
          root: 0,
          powerzyme: 0,
          supervit: 0,
          delta9: 0,
          boost: 0,
          pk1314: 0
        },
        penultimateCrop: {
          grow: 0,
          flower: 0,
          root: 0,
          powerzyme: 0,
          supervit: 0,
          delta9: 0,
          boost: 0,
          pk1314: 0
        }
      }
    };
    this.wateringsButton = 'AeroFarm';
    this.wateringsContainer = 'AeroFlo';
    this.wateringsFloChart = new Chart('wateringsFloChart', {
      type: 'line',
      data: {
          labels: [ 'Crecimiento', 'Floración', 'Complejo radicular', 'PowerZyme', 'SuperVit', 'Delta 9', 'Boost', 'PK 13-14' ],
          datasets: [
            {
              label: 'Último cultivo',
              data: [0, 0, 0, 0, 0, 0, 0, 0],
              backgroundColor: 'rgba(183, 28, 28, .5)',
              borderColor: 'rgba(183, 28, 28, .5)',
              fill: false
            },
            {
              label: 'Penúltimo cultivo',
              data: [0, 0, 0, 0, 0, 0, 0, 0],
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
    this.wateringsFarmChart = new Chart('wateringsFarmChart', {
      type: 'line',
      data: {
          labels: [ 'Crecimiento', 'Floración', 'Complejo radicular', 'PowerZyme', 'SuperVit', 'Delta 9', 'Boost', 'PK 13-14' ],
          datasets: [
            {
              label: 'Último cultivo',
              data: [0, 0, 0, 0, 0, 0, 0, 0],
              backgroundColor: 'rgba(183, 28, 28, .5)',
              borderColor: 'rgba(183, 28, 28, .5)',
              fill: false
            },
            {
              label: 'Penúltimo cultivo',
              data: [0, 0, 0, 0, 0, 0, 0, 0],
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

  getJoyGarden() {
    if (!this.jgCalled) {
      this._jgWateringsService.getWaterings().subscribe(waterings => {
        let floIndex = 0;
        let farmIndex = 0;
        for (let watering of waterings.waterings) {
          if (watering.container == 'AeroFlo' && floIndex < 2) {
            switch (floIndex) {
              case 0:
                this.waterings.aeroflo.lastCrop.grow += watering.fertilizer[0].grow || 0;
                this.waterings.aeroflo.lastCrop.flower += watering.fertilizer[0].flower || 0;
                this.waterings.aeroflo.lastCrop.root += watering.fertilizer[0].root || 0;
                this.waterings.aeroflo.lastCrop.powerzyme += watering.fertilizer[0].powerzyme || 0;
                this.waterings.aeroflo.lastCrop.supervit += watering.fertilizer[0].supervit || 0;
                this.waterings.aeroflo.lastCrop.delta9 += watering.fertilizer[0].delta9 || 0;
                this.waterings.aeroflo.lastCrop.boost += watering.fertilizer[0].boost || 0;
                this.waterings.aeroflo.lastCrop.pk1314 += watering.fertilizer[0].pk1314 || 0;
                break;
              case 1:
                this.waterings.aeroflo.penultimateCrop.grow += watering.fertilizer[0].grow || 0;
                this.waterings.aeroflo.penultimateCrop.flower += watering.fertilizer[0].flower || 0;
                this.waterings.aeroflo.penultimateCrop.root += watering.fertilizer[0].root || 0;
                this.waterings.aeroflo.penultimateCrop.powerzyme += watering.fertilizer[0].powerzyme || 0;
                this.waterings.aeroflo.penultimateCrop.supervit += watering.fertilizer[0].supervit || 0;
                this.waterings.aeroflo.penultimateCrop.delta9 += watering.fertilizer[0].delta9 || 0;
                this.waterings.aeroflo.penultimateCrop.boost += watering.fertilizer[0].boost || 0;
                this.waterings.aeroflo.penultimateCrop.pk1314 += watering.fertilizer[0].pk1314 || 0;
                break;
            }
            if (watering.fertilizer[0].grow > 100) {
              floIndex++;
            }
          } else if (watering.container == 'AeroFarm' && farmIndex < 2) {
            switch (farmIndex) {
              case 0:
                this.waterings.aerofarm.lastCrop.grow += watering.fertilizer[0].grow || 0;
                this.waterings.aerofarm.lastCrop.flower += watering.fertilizer[0].flower || 0;
                this.waterings.aerofarm.lastCrop.root += watering.fertilizer[0].root || 0;
                this.waterings.aerofarm.lastCrop.powerzyme += watering.fertilizer[0].powerzyme || 0;
                this.waterings.aerofarm.lastCrop.supervit += watering.fertilizer[0].supervit || 0;
                this.waterings.aerofarm.lastCrop.delta9 += watering.fertilizer[0].delta9 || 0;
                this.waterings.aerofarm.lastCrop.boost += watering.fertilizer[0].boost || 0;
                this.waterings.aerofarm.lastCrop.pk1314 += watering.fertilizer[0].pk1314 || 0;
                break;
              case 1:
                this.waterings.aerofarm.penultimateCrop.grow += watering.fertilizer[0].grow || 0;
                this.waterings.aerofarm.penultimateCrop.flower += watering.fertilizer[0].flower || 0;
                this.waterings.aerofarm.penultimateCrop.root += watering.fertilizer[0].root || 0;
                this.waterings.aerofarm.penultimateCrop.powerzyme += watering.fertilizer[0].powerzyme || 0;
                this.waterings.aerofarm.penultimateCrop.supervit += watering.fertilizer[0].supervit || 0;
                this.waterings.aerofarm.penultimateCrop.delta9 += watering.fertilizer[0].delta9 || 0;
                this.waterings.aerofarm.penultimateCrop.boost += watering.fertilizer[0].boost || 0;
                this.waterings.aerofarm.penultimateCrop.pk1314 += watering.fertilizer[0].pk1314 || 0;
                break;
            }
            if (watering.fertilizer[0].grow > 100) {
              farmIndex++;
            }
          } else if (farmIndex == 2 && floIndex == 2) {
            break;
          } else {
            console.log('Error - ' + watering.container);
          }
        }
        this.wateringsFloChart.data.datasets[0].data = [
          this.waterings.aeroflo.lastCrop.grow,
          this.waterings.aeroflo.lastCrop.flower,
          this.waterings.aeroflo.lastCrop.root,
          this.waterings.aeroflo.lastCrop.powerzyme,
          this.waterings.aeroflo.lastCrop.supervit,
          this.waterings.aeroflo.lastCrop.delta9,
          this.waterings.aeroflo.lastCrop.boost,
          this.waterings.aeroflo.lastCrop.pk1314
        ];
        this.wateringsFloChart.data.datasets[1].data = [
          this.waterings.aeroflo.penultimateCrop.grow,
          this.waterings.aeroflo.penultimateCrop.flower,
          this.waterings.aeroflo.penultimateCrop.root,
          this.waterings.aeroflo.penultimateCrop.powerzyme,
          this.waterings.aeroflo.penultimateCrop.supervit,
          this.waterings.aeroflo.penultimateCrop.delta9,
          this.waterings.aeroflo.penultimateCrop.boost,
          this.waterings.aeroflo.penultimateCrop.pk1314
        ];
        this.wateringsFarmChart.data.datasets[0].data = [
          this.waterings.aerofarm.lastCrop.grow,
          this.waterings.aerofarm.lastCrop.flower,
          this.waterings.aerofarm.lastCrop.root,
          this.waterings.aerofarm.lastCrop.powerzyme,
          this.waterings.aerofarm.lastCrop.supervit,
          this.waterings.aerofarm.lastCrop.delta9,
          this.waterings.aerofarm.lastCrop.boost,
          this.waterings.aerofarm.lastCrop.pk1314
        ];
        this.wateringsFarmChart.data.datasets[1].data = [
          this.waterings.aerofarm.penultimateCrop.grow,
          this.waterings.aerofarm.penultimateCrop.flower,
          this.waterings.aerofarm.penultimateCrop.root,
          this.waterings.aerofarm.penultimateCrop.powerzyme,
          this.waterings.aerofarm.penultimateCrop.supervit,
          this.waterings.aerofarm.penultimateCrop.delta9,
          this.waterings.aerofarm.penultimateCrop.boost,
          this.waterings.aerofarm.penultimateCrop.pk1314
        ]
        this.wateringsFloChart.update();
        this.wateringsFarmChart.update();
      });
    }
  }

  changeContainer() {
    if (this.wateringsButton == 'AeroFarm') {
      this.wateringsButton = 'AeroFlo';
      this.wateringsContainer = 'AeroFarm';
      this.wateringsFarm.nativeElement.classList.remove('hidden');
      this.wateringsFlo.nativeElement.classList.add('hidden');
    } else if (this.wateringsButton == 'AeroFlo') {
      this.wateringsButton = 'AeroFarm';
      this.wateringsContainer = 'AeroFlo';
      this.wateringsFarm.nativeElement.classList.add('hidden');
      this.wateringsFlo.nativeElement.classList.remove('hidden');
    }
  }

}
