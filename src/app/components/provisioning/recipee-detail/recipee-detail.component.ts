import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Recipee } from 'src/app/models/recipee';
import { RecipeesService } from 'src/app/services/recipees/recipees.service';

@Component({
  selector: 'app-recipee-detail',
  templateUrl: './recipee-detail.component.html',
  styleUrls: ['./recipee-detail.component.scss']
})
export class RecipeeDetailComponent implements OnInit {
  recipee: Recipee;
  private _id: string;

  constructor(
    private _recipeesService: RecipeesService,
    private _route: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit() {
    this._id = this._route.snapshot.paramMap.get('_id');
    this._recipeesService.getRecipee(this._id)
      .subscribe(recipee => {
        this.recipee = recipee;
      });
  }

  goBack(): void {
    this._location.back();
  }

  deleteRecipee(): void {
    this._recipeesService.removeRecipee(this._id).subscribe(res => {
      this.goBack();
    });
  }

}
