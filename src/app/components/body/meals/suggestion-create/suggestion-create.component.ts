import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Suggestion } from 'src/app/models/suggestion';
import { SuggestionsService } from 'src/app/services/suggestions/suggestions.service';
import { ChipItem } from 'src/app/models/chip-item';

@Component({
  selector: 'app-suggestion-create',
  templateUrl: './suggestion-create.component.html',
  styleUrls: ['./suggestion-create.component.scss']
})
export class SuggestionCreateComponent implements OnInit {

  addSuggestionForm: FormGroup;
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

  constructor(
    private _suggestionsService: SuggestionsService,
    private _location: Location,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.addSuggestionForm = this._formBuilder.group({
      name: ['', [ Validators.required ]],
      season: [[], []],
      ingredients: [[], []]
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
          console.log('Pass a parameter');
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
        console.log('Pass a parameter');
        break;
    }
  }

  saveSuggestion() {
    const seasonItems: string[] = [];
    for (const season of this.seasonItems) {
      seasonItems.push(season.name);
    }
    const ingredientItems: string[] = [];
    for (const ingredient of this.ingredientItems) {
      ingredientItems.push(ingredient.name);
    }
    this.suggestion = {
      _id: null,
      name: this.addSuggestionForm.value.name,
      season: seasonItems,
      ingredients: ingredientItems
    };
    this._suggestionsService.addSuggestion(this.suggestion).subscribe(() => {
      this.goBack();
    });
  }

  goBack(): void {
    this._location.back();
  }

}
