import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Rehearsal } from 'src/app/models/rehearsal';
import { RehearsalsService } from 'src/app/services/rehearsals/rehearsals.service';
import { Sheet } from 'src/app/models/sheet';

@Component({
  selector: 'app-rehearsal-update',
  templateUrl: './rehearsal-update.component.html',
  styleUrls: ['./rehearsal-update.component.scss']
})
export class RehearsalUpdateComponent implements OnInit {

  updateRehearsalForm: FormGroup;
  rehearsal: Rehearsal;
  sheets: Sheet[];
  sheetIndex: number;
  sheetFormAction: string;
  addSheetForm: FormGroup;
  availableInstruments: string[];
  private _id: string;

  constructor(
    private _rehearsalsService: RehearsalsService,
    private _location: Location,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._id = this._route.snapshot.paramMap.get('_id');
    this.updateRehearsalForm = this._formBuilder.group({
      date: [new Date(), [Validators.required]],
      instrument: ['', [Validators.required]],
      time: [, [Validators.required]]
    });
    this.addSheetForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      time: [, [Validators.required]]
    });
    this._rehearsalsService.getRehearsal(this._id)
      .subscribe(rehearsal => {
        this.rehearsal = rehearsal;
        this.updateRehearsalForm.patchValue({
          date: rehearsal.date,
          instrument: rehearsal.instrument,
          time: rehearsal.time
        });
        this.sheets = this.rehearsal.sheets;
      });
    this.sheets = [];
    this.sheetIndex = -1;
    this.sheetFormAction = 'Añadir';
    this.availableInstruments = ['Guitarra', 'Piano', 'Batería', 'Bajo', 'MKII'];
  }

  addSheet(newSheet?: number) {
    if (newSheet !== -1) {
      this.sheets[this.sheetIndex].name = this.addSheetForm.value.name;
      this.sheets[this.sheetIndex].time = this.addSheetForm.value.time;
      this.sheetIndex = -1;
      this.sheetFormAction = 'Añadir';
      this.clearSheetForm();
    } else {
      this.sheets.push({
        name: this.addSheetForm.value.name,
        time: this.addSheetForm.value.time
      });
      this.clearSheetForm();
    }
  }

  editSheet(index: number, name: string, time: number) {
    this.sheetIndex = index;
    this.addSheetForm.patchValue({
      name,
      time
    });
    this.sheetFormAction = 'Editar';
  }

  removeSheet(index: number) {
    this.sheets.splice(index, 1);
    this.clearSheetForm();
  }

  clearSheetForm() {
    this.addSheetForm.patchValue({ name: '', time: ''});
  }

  updateRehearsal() {
    this.rehearsal = {
      _id: null,
      date: this.updateRehearsalForm.value.date,
      instrument: this.updateRehearsalForm.value.instrument,
      time: this.updateRehearsalForm.value.time,
      sheets: this.sheets
    };
    this._rehearsalsService.updateRehearsal(this._id, this.rehearsal).subscribe(res => {
      this.goBack();
    }, error => {
      console.log(error);
    });
  }

  deleteRehearsal() {
    this._rehearsalsService.removeRehearsals(this._id).subscribe(() => {
      this.goBack();
    }, error => {
      console.log(error);
    });
  }

  goBack(): void {
    this._location.back();
  }

}
