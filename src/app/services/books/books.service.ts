import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book';
import { Globals } from '../globals';

export interface BooksResponse {
  count: number;
  books: Book[];
}

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  response;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })
  };

  constructor(private http: HttpClient, private globals: Globals) {}

  getBooks(): Observable<BooksResponse> {
    return this.http.get<BooksResponse>(this.globals.url + '/library', this.httpOptions);
  }

  getBook(_id: string): Observable<Book> {
    return this.http.get<Book>(this.globals.url + '/library/' + _id, this.httpOptions);
  }

  addBook(project: Book): Observable<any> {
    return this.http.post<Book>(this.globals.url + '/library', project, this.httpOptions);
  }

  updateBook(_id: string, book: Book) {
    const body = [
      {
        propName: 'title',
        value: book.title
      },
      {
        propName: 'author',
        value: book.author
      },
      {
        propName: 'category',
        value: book.category
      },
      {
        propName: 'pages',
        value: book.pages
      },
      {
        propName: 'img',
        value: book.img
      },
      {
        propName: 'read',
        value: book.read
      },
      {
        propName: 'readDate',
        value: book.readDate
      },
      {
        propName: 'rating',
        value: book.rating
      },
      {
        propName: 'comments',
        value: book.comments
      }
    ];
    return this.http.patch<Book>(this.globals.url + '/library/' + _id, body, this.httpOptions);
  }

  removeBook(_id: string): any {
    return this.http.delete(this.globals.url + '/library/' + _id, this.httpOptions);
  }
}
