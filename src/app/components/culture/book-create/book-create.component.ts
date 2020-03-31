import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books/books.service';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {

  addBookForm: FormGroup;
  book: Book;
  readBook: boolean;
  bookRating: number;

  constructor(
    private _booksService: BooksService,
    private _location: Location,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.addBookForm = this._formBuilder.group({
      title: ['', [
        Validators.required
      ]],
      author: ['', [
        Validators.required
      ]],
      category: ['', [
        Validators.required
      ]],
      pages: [, [
        Validators.min(0),
        Validators.max(5000)
      ]],
      img: ['', []],
      read: [false, []],
      readDate: ['', []],
      rating: [, []],
      comments: ['', []]
    });
  }

  goBack(): void {
    this._location.back();
  }

  saveBook(): void {
    if (this.addBookForm.invalid) {
      return;
    }
    this.book = {
      _id: null,
      title: this.addBookForm.value.title,
      author: this.addBookForm.value.author,
      category: this.addBookForm.value.category,
      pages: this.addBookForm.value.pages,
      img: this.addBookForm.value.img,
      read: this.readBook,
      readDate: this.addBookForm.value.readDate,
      rating: this.bookRating,
      comments: this.addBookForm.value.comments
    };
    this._booksService.addBook(this.book).subscribe(() => {
      this.goBack();
    }, error => {
      console.log(error);
    });
  }

  rateBook(rating: number) {
    this.bookRating = rating;
  }

}

