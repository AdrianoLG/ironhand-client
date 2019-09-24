import { Component, OnInit } from '@angular/core';
import { SelectedTabService, Tab } from 'src/app/services/tabs/selected-tab.service';
import { FormControl } from '@angular/forms';
import { BooksService } from 'src/app/services/books/books.service';
import { Book } from 'src/app/models/book';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies/movies.service';

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

	constructor(
		private _selectedTabService: SelectedTabService,
		private _bookService: BooksService,
		private _moviesService: MoviesService
	) {}

	ngOnInit() {
		this._selectedTabService.currentTabs.subscribe(currentTabs => {
			this.currentTabs = currentTabs;
			for (const currentTab of currentTabs) {
				if (currentTab.name === 'culture') {
					this.selectedIndex = currentTab.selected;
				}
			}
		});
		this._bookService.getBooks().subscribe(books => {
			this.booksCount = books.count;
			this.books = books.books;
		});
		this._moviesService.getMovies().subscribe(movies => {
			this.moviesCount = movies.count;
			this.movies = movies.movies;
		});
	}

	changeSelectedIndex($event): void {
		let tabValue: string;

		switch ($event.index) {
			case 0:
				tabValue = 'Libros';
				break;
			case 2:
				tabValue = 'Peliculas';
				break;
			case 3:
				tabValue = 'Series';
				break;
			default:
				console.log('No value');
		}
		const tabIndex = this.currentTabs.findIndex(tab => tab.name === tabValue);
		console.log(tabIndex);

		this.currentTabs[tabIndex].selected = $event.index;

		this._selectedTabService.changeTabs(this.currentTabs);
		this._selectedTabService.currentTabs.subscribe(tabs => {
			console.log(tabs);
		});

		this.selectedIndex = $event.index;
	}
}
