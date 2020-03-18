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
      // Checks for current tab
      this._selectedTabService.currentTabs.subscribe(currentTabs => {
        this.currentTabs = currentTabs;
        for (const currentTab of currentTabs) {
          if (currentTab.name === 'culture') {
            this.tabGroup = currentTabs.indexOf(currentTab);
            this.selectedIndex = currentTab.selected;
          }
        }
      });
      // Gets books
      this._bookService.getBooks().subscribe(books => {
        this.booksCount = books.count;
        this.books = books.books;
      });
      // Gets movies
      this._moviesService.getMovies().subscribe(movies => {
        this.moviesCount = movies.count;
        this.movies = movies.movies;
      });
      // Gets TV Series
      this._tvSeriesService.getTvSeries().subscribe(tvSeries => {
        this.tvSeriesCount = tvSeries.count;
        this.tvSeries = tvSeries.tvSeries;
      });
    }

    // Changes selected tab - clicks
    changeSelectedIndex($event): void {
      const tabIndex = $event.index;
      this.selectedIndex = tabIndex;
      this.currentTabs[this.tabGroup].selected = tabIndex;
      this._selectedTabService.changeTabs(this.currentTabs);
    }

    // Changes selected tab - swipes
    changeSection(tabIndex): void {
      this.selectedIndex = tabIndex;
      this.currentTabs[this.tabGroup].selected = tabIndex;
      this._selectedTabService.changeTabs(this.currentTabs);
    }

    // If exists it stablishes the next tab
    nextSection(selectedIndex) {
      if (selectedIndex < document.getElementsByClassName('mat-tab-label').length - 1) {
        this.changeSection(selectedIndex + 1);
      }
    }

    // If exists it stablishes the previous tab
    previousSection(selectedIndex) {
      if (selectedIndex > 0) {
        this.changeSection(selectedIndex - 1);
      }
    }
  }
