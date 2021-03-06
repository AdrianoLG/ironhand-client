import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books/books.service';
import { Book } from 'src/app/models/book';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  book: Book;
  private _id: string;

  constructor(
    private _booksService: BooksService,
    private _route: ActivatedRoute,
    private _location: Location
    ) { }

    ngOnInit() {
      this._id = this._route.snapshot.paramMap.get('_id');
      this._booksService.getBook(this._id)
      .subscribe(book => {
        this.book = book;
      });
    }

    goBack(): void {
      this._location.back();
    }

    deleteBook(): void {
      this._booksService.removeBook(this._id)
      .subscribe(() => {
        this.goBack();
      }, error => {
        console.log(error);
      });
    }
  }
