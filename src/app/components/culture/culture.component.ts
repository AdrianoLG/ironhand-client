import { Component, OnInit } from '@angular/core';
import { SelectedTabService, Tab } from 'src/app/services/tabs/selected-tab.service';
import { FormControl } from '@angular/forms';
import { BooksService } from 'src/app/services/books/books.service';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-culture',
  templateUrl: './culture.component.html',
  styleUrls: ['./culture.component.scss']
})
export class CultureComponent implements OnInit {

  selectedIndex: number;
  currentTabs: Tab[];
  booksAutocomplete: FormControl;
  booksOptions: string[];
  books: Book[];
  booksCount: number;
  readBook: boolean;
  filterBook: any;

  constructor(
    private _selectedTabService: SelectedTabService,
    private _bookService: BooksService
  ) { }

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
    this.booksOptions = ['One', 'Two', 'Three'];
    this.booksAutocomplete = new FormControl();
  }

  changeSelectedIndex($event): void {
    const tabIndex = this.currentTabs.findIndex(tab => tab.name === $event.index);
    let tabValue: number;
    switch ($event.index) {
      case 'Libros':
        tabValue = 0;
        break;
      case 'Libros':
        tabValue = 1;
        break;
      case 'Libros':
        tabValue = 2;
        break;
      default:
        console.log('No value');
    }
    this.currentTabs[tabIndex].selected = tabValue;

    this._selectedTabService.changeTabs(this.currentTabs);
    this.selectedIndex = $event.index;
  }

}
