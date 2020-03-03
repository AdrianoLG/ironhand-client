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

  constructor(
    private _rehearsalsService: RehearsalsService,
    private _location: Location,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.addRehearsalForm = this._formBuilder.group({
      instrument: ['', [Validators.required]],
      time: [, [Validators.required]]
    });
    this.sheets = [];
  }

  addSheet(name, time) {
    this.sheets.push({
      name: name,
      time: time
    });
  }

  removeSheet() {
    this.sheets.pop();
  }

  createRehearsal() {
    this.rehearsal = {
      _id: null,
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
