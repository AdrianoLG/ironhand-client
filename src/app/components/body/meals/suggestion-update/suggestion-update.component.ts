import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Suggestion } from 'src/app/models/suggestion';
import { SuggestionsService } from 'src/app/services/suggestions/suggestions.service';
import { ActivatedRoute } from '@angular/router';
import { ChipItem } from 'src/app/models/chip-item';

@Component({
  selector: 'app-suggestion-update',
  templateUrl: './suggestion-update.component.html',
  styleUrls: ['./suggestion-update.component.scss']
})
export class SuggestionUpdateComponent implements OnInit {

  updateSuggestionForm: FormGroup;
  seSelectable = true;
  seRemovable = true;
  seAddOnBlur = true;
  seasonItems: ChipItem[] = [];
  inSelectable = true;
  inRemovable = true;
  inAddOnBlur = true;
  ingredientItems: ChipItem[] = [];
  suggestion: Suggestion;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public _id: string;

  constructor(
    private _suggestionsService: SuggestionsService,
    private _location: Location,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get('_id');
    this._suggestionsService.getSuggestion(this._id).subscribe(suggestion => {
      this.suggestion = suggestion;
      for (const meal of this.suggestion.season) {
        this.seasonItems.push({ name: meal });
      }
      for (const meal of this.suggestion.ingredients) {
        this.ingredientItems.push({ name: meal });
      }
      this.updateSuggestionForm = this._formBuilder.group({
        name: ['', [ Validators.required ]],
        season: [[], []],
        ingredients: [[], []]
      });
      this.updateSuggestionForm.patchValue({
        name: suggestion.name
      });
    });
  }

  addItem(type: string, event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      switch (type) {
        case 'season':
          this.seasonItems.push({name: value.trim()});
          break;
        case 'ingredient':
          this.ingredientItems.push({name: value.trim()});
          break;
        default:
          console.log('No more cases. Check the code');
          break;
      }
    }

    if (input) {
      input.value = '';
    }
  }

  removeItem(type: string, item: ChipItem): void {
    switch (type) {
      case 'season':
        if (this.seasonItems.indexOf(item) >= 0) {
          this.seasonItems.splice(this.seasonItems.indexOf(item), 1);
        }
        break;
      case 'ingredient':
        if (this.ingredientItems.indexOf(item) >= 0) {
          this.ingredientItems.splice(this.ingredientItems.indexOf(item), 1);
        }
        break;
      default:
        console.log('No more cases. Check the code');
        break;
    }
  }

  updateSuggestion() {
    const seasonItems: string[] = [];
    for (const season of this.seasonItems) {
      seasonItems.push(season.name);
    }
    const ingredientItems: string[] = [];
    for (const ingredient of this.ingredientItems) {
      ingredientItems.push(ingredient.name);
    }
    this.suggestion = {
      _id: this._id,
      name: this.updateSuggestionForm.value.name,
      season: seasonItems,
      ingredients: ingredientItems
    };
    this._suggestionsService.updateSuggestion(this.suggestion._id, this.suggestion).subscribe(() => {
      this.goBack();
    }, error => {
      console.log(error);
    });
  }

  deleteSuggestion(): void {
    this._suggestionsService.removeSuggestion(this._id).subscribe(() => {
      this.goBack();
    }, error => {
      console.log(error);
    });
  }

  goBack(): void {
    this._location.back();
  }

}
