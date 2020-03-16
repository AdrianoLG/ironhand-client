import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rehearsal } from 'src/app/models/rehearsal';
import { RehearsalsService } from 'src/app/services/rehearsals/rehearsals.service';
import { Sheet } from 'src/app/models/sheet';

@Component({
  selector: 'app-rehearsal-create',
  templateUrl: './rehearsal-create.component.html',
  styleUrls: ['./rehearsal-create.component.scss']
})
export class RehearsalCreateComponent implements OnInit {
  addRehearsalForm: FormGroup;
  rehearsal: Rehearsal;
  sheets: Sheet[];
  sheetIndex: number;
  sheetFormAction: string;
  addSheetForm: FormGroup;
  availableInstruments: string[];

  constructor(
    private _rehearsalsService: RehearsalsService,
    private _location: Location,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.addRehearsalForm = this._formBuilder.group({
      date: [new Date(), [Validators.required]],
      instrument: ['', [Validators.required]],
      time: [, [Validators.required]]
    });
    this.addSheetForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      time: [, [Validators.required]]
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

  saveRehearsal() {
    this.rehearsal = {
      _id: null,
      date: this.addRehearsalForm.value.date,
      instrument: this.addRehearsalForm.value.instrument,
      time: this.addRehearsalForm.value.time,
      sheets: this.sheets
    };
    this._rehearsalsService.addRehearsal(this.rehearsal).subscribe(res => {
      this.goBack();
    });
  }

  goBack(): void {
    this._location.back();
  }

}
