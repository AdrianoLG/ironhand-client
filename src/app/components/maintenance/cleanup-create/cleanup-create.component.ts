import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { Cleanup } from 'src/app/models/cleanup';
import { CleanupService } from 'src/app/services/cleanup/cleanup.service';

@Component({
  selector: 'app-cleanup-create',
  templateUrl: './cleanup-create.component.html',
  styleUrls: ['./cleanup-create.component.scss']
})
export class CleanupCreateComponent implements OnInit {

  addCleanupForm: FormGroup;
  cleanup: Cleanup;
  tasks = [];
  availablePlaces: Array<string>;
  bed = false;
  broom = false;
  carwash = false;
  cleaningkit = false;
  clothes = false;
  clothespeg = false;
  desinfectant = false;
  dishwasher = false;
  duster = false;
  iron = false;
  sponge = false;
  vacuum = false;
  washingmachine = false;

  constructor(
    private _cleanupService: CleanupService,
    private _location: Location,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.addCleanupForm = this._formBuilder.group({
      place: ['', [Validators.required]],
      date: ['', [Validators.required]]
    });
    this.availablePlaces = [
      'Garaje',
      'Taller',
      'Bodega',
      'Salón',
      'Cocina',
      'Habitación',
      'Estudio',
      'Ático',
      'Terraza Norte',
      'Terraza Sur',
      'Escaleras'
    ];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(task) {
    const index = this.tasks.indexOf(task, 0);
    if (index > -1) {
      this.tasks.splice(index, 1);
    }
  }

  goBack(): void {
    this._location.back();
  }

  saveCleanup(): void {
    if (this.addCleanupForm.invalid) {
      return;
    }
    this.cleanup = {
      _id: null,
      place: this.addCleanupForm.value.place,
      date: this.addCleanupForm.value.date,
      tasks: this.tasks
    };
    this._cleanupService.addCleanup(this.cleanup).subscribe(() => {
      this.goBack();
    }, error => {
      console.log(error);
    });
  }

  toggle(item) {
    switch (item) {
      case 'bed':
        this.bed = !this.bed;
        if (this.bed) {
          this.addTask('bed');
        } else {
          this.removeTask('bed');
        }
        break;
      case 'broom':
        this.broom = !this.broom;
        if (this.broom) {
          this.addTask('broom');
        } else {
          this.removeTask('broom');
        }
        break;
      case 'carwash':
        this.carwash = !this.carwash;
        if (this.carwash) {
          this.addTask('carwash');
        } else {
          this.removeTask('carwash');
        }
        break;
      case 'cleaningkit':
        this.cleaningkit = !this.cleaningkit;
        if (this.cleaningkit) {
          this.addTask('cleaningkit');
        } else {
          this.removeTask('cleaningkit');
        }
        break;
      case 'clothes':
        this.clothes = !this.clothes;
        if (this.clothes) {
          this.addTask('clothes');
        } else {
          this.removeTask('clothes');
        }
        break;
      case 'clothespeg':
        this.clothespeg = !this.clothespeg;
        if (this.clothespeg) {
          this.addTask('clothespeg');
        } else {
          this.removeTask('clothespeg');
        }
        break;
      case 'desinfectant':
        this.desinfectant = !this.desinfectant;
        if (this.desinfectant) {
          this.addTask('desinfectant');
        } else {
          this.removeTask('desinfectant');
        }
        break;
      case 'dishwasher':
        this.dishwasher = !this.dishwasher;
        if (this.dishwasher) {
          this.addTask('dishwasher');
        } else {
          this.removeTask('dishwasher');
        }
        break;
      case 'duster':
        this.duster = !this.duster;
        if (this.duster) {
          this.addTask('duster');
        } else {
          this.removeTask('duster');
        }
        break;
      case 'iron':
        this.iron = !this.iron;
        if (this.iron) {
          this.addTask('iron');
        } else {
          this.removeTask('iron');
        }
        break;
      case 'sponge':
        this.sponge = !this.sponge;
        if (this.sponge) {
          this.addTask('sponge');
        } else {
          this.removeTask('sponge');
        }
        break;
      case 'vacuum':
        this.vacuum = !this.vacuum;
        if (this.vacuum) {
          this.addTask('vacuum');
        } else {
          this.removeTask('vacuum');
        }
        break;
      case 'washingmachine':
        this.washingmachine = !this.washingmachine;
        if (this.washingmachine) {
          this.addTask('washingmachine');
        } else {
          this.removeTask('washingmachine');
        }
        break;
      default:
        console.log('Wheres that option?');
        break;
    }
    console.log(this.tasks);
  }

}
