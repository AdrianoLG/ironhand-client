import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books/books.service';
import { DateAdapter } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.scss']
})
export class BookUpdateComponent implements OnInit {

  updateBookForm: FormGroup;
  book: Book;
  readBook: boolean;
  bookRating: number;
  private _id: string;

  constructor(
    private _booksService: BooksService,
    private _location: Location,
    private _formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.book = null;
    this._id = this._route.snapshot.paramMap.get('_id');
    this._booksService.getBook(this._id).subscribe(book => {
      this.book = book;
      this.readBook = book.read;
      this.bookRating = book.rating;
      this.updateBookForm.patchValue({
        title: book.title,
        author: book.author,
        category: book.category,
        pages: book.pages,
        img: book.img,
        read: this.readBook,
        readDate: book.readDate,
        rating: this.bookRating,
        comments: book.comments
      });
    });
    this.updateBookForm = this._formBuilder.group({
      title: ['', [
        Validators.required
      ]],
      author: ['', [
        Validators.required
      ]],
      category: ['', [
        Validators.required
      ]],
      pages: [0, [
        Validators.min(0),
        Validators.max(5000)
      ]],
      img: ['', []],
      read: [false, []],
      readDate: ['', []],
      rating: [0, []],
      comments: ['', []]
    });
  }

  updateBook() {
    this.book = {
      _id: null,
      title: this.updateBookForm.value.title,
      author: this.updateBookForm.value.author,
      category: this.updateBookForm.value.category,
      pages: this.updateBookForm.value.pages,
      img: this.updateBookForm.value.img,
      read: this.readBook,
      readDate: this.updateBookForm.value.readDate,
      rating: this.bookRating,
      comments: this.updateBookForm.value.comments
    };

    this._booksService.updateBook(this._id, this.book).subscribe(response => {
      this.goBack();
    }, error => {
      console.log(error);
    });
  }

  deleteBook(): void {
    this._booksService.removeBook(this._id).subscribe(response => {
      this.goBack();
    }, error => {
      console.log(error);
    });
  }

  goBack(): void {
    this._router.navigate(['/cultura']);
  }

}
