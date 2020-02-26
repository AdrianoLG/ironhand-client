import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ChipItem } from 'src/app/models/chip-item';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Movie } from 'src/app/models/movie';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-update',
  templateUrl: './movie-update.component.html',
  styleUrls: ['./movie-update.component.scss']
})

export class MovieUpdateComponent implements OnInit {
  updateMovieForm: FormGroup;
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
  private _id: string;

  constructor(
    private _moviesService: MoviesService,
    private _location: Location,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._id = this._route.snapshot.paramMap.get('_id');
    this._moviesService.getMovie(this._id)
      .subscribe(movie => {
        this.movie = movie;
        for (const actor of this.movie.cast) {
          this.castItems.push({ name: actor });
        }
        for (const category of this.movie.categories) {
          this.categoriesItems.push({ name: category });
        }
        this.seenMovie = movie.seen;
        this.movieRating = movie.rating;
        this.updateMovieForm = this._formBuilder.group({
          title: ['', [Validators.required]],
          director: ['', [Validators.required]],
          year: [1895, [Validators.required, Validators.min(1895)]],
          cast: [[], []],
          categories: [[], []],
          duration: [, []],
          img: ['', []],
          seen: [false, []],
          seenDate: ['', []],
          rating: [, []]
        });
        this.updateMovieForm.patchValue({
          title: movie.title,
          director: movie.director,
          year: movie.year,
          duration: movie.duration,
          img: movie.img,
          seen: this.seenMovie,
          seenDate: movie.seenDate,
          rating: this.movieRating
        });
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
        console.log('Pass a parameter');
        break;
    }
  }

  updateMovie(): void {
    const castItems: string[] = [];
    for (const castItem of this.castItems) {
      castItems.push(castItem.name);
    }
    const categoriesItems: string[] = [];
    for (const categorieItem of this.categoriesItems) {
      categoriesItems.push(categorieItem.name);
    }
    if (this.updateMovieForm.invalid) {
      return;
    }
    this.movie = {
      _id: null,
      title: this.updateMovieForm.value.title,
      director: this.updateMovieForm.value.director,
      year: this.updateMovieForm.value.year,
      cast: castItems,
      categories: categoriesItems,
      duration: this.updateMovieForm.value.duration,
      img: this.updateMovieForm.value.img,
      seen: this.seenMovie,
      seenDate: this.updateMovieForm.value.seenDate,
      rating: this.movieRating
    };
    this._moviesService.updateMovie(this._id, this.movie).subscribe(
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
    console.log(this.movieRating);
  }

}
