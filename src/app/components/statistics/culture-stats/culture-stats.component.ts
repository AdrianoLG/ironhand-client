import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books/books.service';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { TvSeriesService } from 'src/app/services/tv-series/tv-series.service';
import { Book } from 'src/app/models/book';
import { Movie } from 'src/app/models/movie';
import { TvSerie } from 'src/app/models/tv-serie';

@Component({
  selector: 'app-culture-stats',
  templateUrl: './culture-stats.component.html',
  styleUrls: ['./culture-stats.component.scss']
})
export class CultureStatsComponent implements OnInit {
  booksCalled: boolean;
  moviesCalled: boolean;
  tvSeriesCalled: boolean;
  booksCount: number;
  moviesCount: number;
  tvSeriesCount: number;
  readBooks: number;
  seenMovies: number;
  lastBook: Book;
  lastMovie: Movie;
  lastThreeTvSeriesAdded: Array<TvSerie>;

  constructor(
    private _booksService: BooksService,
    private _moviesService: MoviesService,
    private _tvSeriesService: TvSeriesService
  ) { }

  ngOnInit(): void {
    this.booksCalled = false;
    this.moviesCalled = false;
    this.tvSeriesCalled = false;
  }

  getCulture() {
    if (!this.booksCalled) {
      this._booksService.getBooks().subscribe(books => {
        this.booksCount = books.count;
        this.readBooks = 0;
        for (let book of books.books) {
          if (book.read) {
            this.readBooks++;
            if (this.lastBook) {
              if (book.readDate > this.lastBook.readDate) {
                this.lastBook = book;
              }
            } else {
              this.lastBook = book;
            }
          }
        }
      });
      this.booksCalled = true;
    }
    if (!this.moviesCalled) {
      this._moviesService.getMovies().subscribe(movies => {
        this.moviesCount = movies.count;
        this.seenMovies = 0;
        for (let movie of movies.movies) {
          if (movie.seen) {
            this.seenMovies++;
            if (this.lastMovie) {
              if (movie.seenDate > this.lastMovie.seenDate) {
                this.lastMovie = movie;
              }
            } else {
              this.lastMovie = movie;
            }
          }
        }
      });
    }
    if (!this.tvSeriesCalled) {
      this._tvSeriesService.getTvSeries().subscribe(tvseries => {
        this.tvSeriesCount = tvseries.count;
        if (tvseries.tvSeries.length > 3) {
          this.lastThreeTvSeriesAdded = tvseries.tvSeries.slice(tvseries.tvSeries.length - 4, tvseries.tvSeries.length - 1);
        } else {
          this.lastThreeTvSeriesAdded = tvseries.tvSeries;
        }
      });
    }
  }
}
