import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Rehearsal } from 'src/app/models/rehearsal';
import { Sheet } from 'src/app/models/sheet';
import { RehearsalsService } from 'src/app/services/rehearsals/rehearsals.service';

@Component({
  selector: 'app-rehearsal-update',
  templateUrl: './rehearsal-update.component.html',
  styleUrls: ['./rehearsal-update.component.scss']
})
export class RehearsalUpdateComponent implements OnInit {

  updateRehearsalForm: FormGroup;
  rehearsal: Rehearsal;
  sheets: Sheet[];
  private _id: string;

  constructor(
    private _rehearsalsService: RehearsalsService,
    private _location: Location,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._id = this._route.snapshot.paramMap.get('_id');
    this._rehearsalsService.getRehearsal(this._id)
      .subscribe(rehearsal => {
        this.rehearsal = rehearsal;
        this.updateRehearsalForm = this._formBuilder.group({
          instrument: ['', [Validators.required]],
          time: [, [Validators.required]]
        });
        this.updateRehearsalForm.patchValue({
          instrument: rehearsal.instrument,
          time: rehearsal.time
        });
        this.sheets = this.rehearsal.sheets;
      });
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

  updateRehearsal() {
    this.rehearsal = {
      _id: null,
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

  goBack(): void {
    this._location.back();
  }

}
