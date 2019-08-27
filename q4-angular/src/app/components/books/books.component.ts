import { Component, OnInit } from '@angular/core';

import { Book, BooksResponse } from '../../interfaces';

import { BooksService } from '../../services/books/books.service';
import { environment } from '../../../environments/environment';

import * as _ from 'lodash';

const API = environment.api;

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.scss'],
    providers: [
        BooksService
    ]
})
export class BooksComponent implements OnInit {

    public title = 'Top books of all time';
    public booksOrig: Book[];
    public books: Book[] = [];
    public bookCount: number;
    public searchText = '';

    public currentPage = 1;
    public itemsPerPage = 5;

    constructor(
        private booksService: BooksService
    ) { }

    ngOnInit() {
        this.fetchBooks();
    }

    private fetchBooks() {
        const subscription = this.booksService.getAllBooks()
            .subscribe((data: BooksResponse) => {
                subscription.unsubscribe();
                this.books = data.books;
                this.bookCount = data.meta.count;

                this.books = this.books
                    .sort( (a: Book, b: Book) => +b.rating - +a.rating)
                    .map( (book: Book, index: number) => {
                        book.derivedTitle = `${index + 1}. ${book.title}`;
                        book.derivedRating = `(${book.rating}/10)`;
                        book.derivedUrl = `/book/${book.slug}`;
                        book.derivedSynopsis = book.synopsis.slice(0, 200) + '...';
                        return book;
                    });

                this.booksOrig = _.clone(this.books);
            });
    }

    private filterBooks() {
        const searchText = this.searchText.toLowerCase();
        this.books = _.filter(this.booksOrig, (book: Book) => {
            return book.title.toLowerCase().indexOf(searchText) !== -1 ||
                book.synopsis.toLowerCase().indexOf(searchText) !== -1 ||
                !this.searchText;
        }) as Book[];
    }

    public onSearch() {
        this.filterBooks();
    }

}
