import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ChipItem } from 'src/app/models/chip-item';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.scss']
})
export class MovieCreateComponent implements OnInit {
  addMovieForm: FormGroup;
  movie: Movie;
  seenMovie: boolean;
  movieRating: number;
  castSelectable = true;
  castRemovable = true;
  castAddOnBlur = true;
  castItems: ChipItem[] = [];
  categoriesSelectable = true;
  categoriesRemovable = true;
  categoriesAddOnBlur = true;
  categoriesItems: ChipItem[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private _moviesService: MoviesService,
    private _location: Location,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.addMovieForm = this._formBuilder.group({
      title: ['', [Validators.required]],
      director: ['', [Validators.required]],
      year: [, [Validators.required, Validators.min(1895)]],
      cast: [[], []],
      categories: [[], []],
      duration: [, []],
      img: ['', []],
      seen: [false, []],
      seenDate: ['', []],
      rating: [, []]
    });
  }

  goBack(): void {
    this._location.back();
  }

  addItem(type: string, event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      switch (type) {
        case 'cast':
          this.castItems.push({ name: value.trim() });
          break;
        case 'categories':
          this.categoriesItems.push({ name: value.trim() });
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
      case 'cast':
        if (this.castItems.indexOf(item) >= 0) {
          this.castItems.splice(this.castItems.indexOf(item), 1);
        }
        break;
      case 'categories':
        if (this.categoriesItems.indexOf(item) >= 0) {
          this.categoriesItems.splice(this.categoriesItems.indexOf(item), 1);
        }
        break;
      default:
        console.log('No more cases. Check the code');
        break;
    }
  }

  saveMovie(): void {
    const castItems: string[] = [];
    for (const castItem of this.castItems) {
      castItems.push(castItem.name);
    }
    const categoriesItems: string[] = [];
    for (const categorieItem of this.categoriesItems) {
      categoriesItems.push(categorieItem.name);
    }
    if (this.addMovieForm.invalid) {
      return;
    }
    this.movie = {
      _id: null,
      title: this.addMovieForm.value.title,
      director: this.addMovieForm.value.director,
      year: this.addMovieForm.value.year,
      cast: castItems,
      categories: categoriesItems,
      duration: this.addMovieForm.value.duration,
      img: this.addMovieForm.value.img,
      seen: this.addMovieForm.value.seen,
      seenDate: this.addMovieForm.value.seenDate,
      rating: this.addMovieForm.value.rating
    };
    this._moviesService.addMovie(this.movie).subscribe(
      () => {
        this.goBack();
      },
      error => {
        console.log(error);
      }
    );
  }


  rateMovie(rating: number) {
    this.movieRating = rating;
  }
}
