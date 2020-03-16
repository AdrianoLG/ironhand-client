import { Component, OnInit } from '@angular/core';
import { Rehearsal } from 'src/app/models/rehearsal';
import { RehearsalsService } from 'src/app/services/rehearsals/rehearsals.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rehearsal',
  templateUrl: './rehearsal.component.html',
  styleUrls: ['./rehearsal.component.scss']
})
export class RehearsalComponent implements OnInit {
  rehearsals: Rehearsal[];
  rehearsalsCount: number;

  constructor(
    private _rehearsalsService: RehearsalsService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._rehearsalsService.getRehearsals().subscribe(rehearsals => {
      this.rehearsals = rehearsals.rehearsals;
      this.rehearsalsCount = rehearsals.count;
    }, error => {
      if (error.status === 401) {
        this._router.navigate(['/login']);
      }
    });
  }

}
