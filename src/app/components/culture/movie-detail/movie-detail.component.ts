import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies/movies.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie;
  private _id: string;

  constructor(
    private _moviesService: MoviesService,
    private _route: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit() {
    this._id = this._route.snapshot.paramMap.get('_id');
    this._moviesService.getMovie(this._id)
      .subscribe(movie => {
        this.movie = movie;
      });
  }

  goBack(): void {
    this._location.back();
  }

  deleteMovie(): void {
    this._moviesService.removeMovie(this._id).subscribe(
      () => {
        this.goBack();
      },
      error => {
        console.log(error);
      }
    );
  }
}
