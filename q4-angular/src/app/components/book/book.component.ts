import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { switchMap } from 'rxjs/operators';

import { BooksService } from '../../services/books/books.service';

import { Book } from '../../interfaces';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss'],
    providers: [
        BooksService
    ]
})
export class BookComponent implements OnInit {

    public selectedBook: Book;
    public commentsForm: FormGroup;
    public comments = [];

    constructor(
        private booksService: BooksService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {
        this.commentsForm = fb.group({
            name: '',
            comment: ''
        });
    }

    ngOnInit() {
        this.fetchBook();
    }

    // fetch the book with the given slug in route params
    private fetchBook() {
        const subscription = this.route.paramMap.pipe(
            switchMap((params: ParamMap) =>
                this.booksService.getBook(params.get('id')))
        ).subscribe((book: Book) => {
            subscription.unsubscribe();
            this.selectedBook = book;
            this.comments = this.selectedBook.comments ? this.selectedBook.comments : [];
        });
    }

    onSubmit() {
        this.comments.push(this.commentsForm.value);
        const subscription = this.booksService.addComment(
            this.selectedBook.slug,
            this.commentsForm.value.name,
            this.commentsForm.value.comment
        ).subscribe( (result: any) => {
            subscription.unsubscribe();
            this.fetchBook();
            this.commentsForm.reset();
        });
    }

}
