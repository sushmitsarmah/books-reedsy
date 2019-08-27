import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const API = environment.api;

@Injectable({
    providedIn: 'root'
})
export class BooksService {

    constructor(
        private http: HttpClient
    ) { }

    getAllBooks(): Observable<any> {
        const url = `${API}/books`;
        return this.http.get(url);
    }

    getBook(slug: string): Observable<any> {
        const url = `${API}/books/${slug}`;
        return this.http.get(url);
    }

    addComment(slug: string, name: string, comment: string): Observable<any> {
        const url = `${API}/add-book-comment`;
        const body = {
            slug,
            name,
            comment
        };
        return this.http.post(url, body);
    }
}
