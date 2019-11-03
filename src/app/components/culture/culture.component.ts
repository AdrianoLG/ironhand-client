import { Component, OnInit } from '@angular/core';
import { SelectedTabService, Tab } from 'src/app/services/tabs/selected-tab.service';
import { BooksService } from 'src/app/services/books/books.service';
import { Book } from 'src/app/models/book';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { TvSerie } from 'src/app/models/tv-serie';
import { TvSeriesService } from 'src/app/services/tv-series/tv-series.service';

@Component({
  selector: 'app-culture',
  templateUrl: './culture.component.html',
  styleUrls: [ './culture.component.scss' ]
})
export class CultureComponent implements OnInit {
  selectedIndex: number;
  currentTabs: Tab[];
  books: Book[];
  booksCount: number;
  readBook: boolean;
  filterBook: any;
  movies: Movie[];
  moviesCount: number;
  filterMovie: any;
  tvSeries: TvSerie[];
  tvSeriesCount: number;
  filterTvSerie: any;
  tabGroup: number;

  constructor(
    private _selectedTabService: SelectedTabService,
    private _bookService: BooksService,
    private _moviesService: MoviesService,
    private _tvSeriesService: TvSeriesService
    ) {}

    ngOnInit() {
      this._selectedTabService.currentTabs.subscribe(currentTabs => {
        this.currentTabs = currentTabs;
        for (const currentTab of currentTabs) {
          if (currentTab.name === 'culture') {
            this.tabGroup = currentTabs.indexOf(currentTab);
            this.selectedIndex = currentTab.selected;
          }
        }
      });
      console.log(`TabGroup ${this.tabGroup}, SelectedIndex ${this.selectedIndex}`);
      this._bookService.getBooks().subscribe(books => {
        this.booksCount = books.count;
        this.books = books.books;
      });
      this._moviesService.getMovies().subscribe(movies => {
        this.moviesCount = movies.count;
        this.movies = movies.movies;
      });
      this._tvSeriesService.getTvSeries().subscribe(tvSeries => {
        this.tvSeriesCount = tvSeries.count;
        this.tvSeries = tvSeries.tvSeries;
      });
    }

    changeSelectedIndex($event): void {
      const tabIndex = $event.index;
      this.selectedIndex = tabIndex;
      this.currentTabs[this.tabGroup].selected = tabIndex;
      this._selectedTabService.changeTabs(this.currentTabs);
      console.log(`TabGroup ${this.tabGroup}, SelectedIndex ${this.selectedIndex}`);
    }
  }
