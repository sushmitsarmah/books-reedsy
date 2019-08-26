import * as functions from 'firebase-functions';

import {
    addBook,
    getBook,
    getBooks,
    updateBook
} from './db';

import {
    Book
} from './interfaces';

import { data } from './books';
import { images } from './images';

const cors = require('cors')({
    origin: true
});

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

const getImageUri = (file: string) => {
    return images.filter(d => d.img === file)[0];
};

export const getAllBooks = functions.https.onRequest( async (request, response) => {
    cors(request, response, async () => {
        let books = await getBooks();
        books = books.map(d => {
            d.cover = getImageUri(d.cover).uri;
            return d;
        })
        response.json({ books, meta: { count: books.length } });
    });
});

export const getBookBySlug = functions.https.onRequest(async (request, response) => {
    cors(request, response, async () => {    
        const slug = request.params[0].split('/').slice(-1)[0];
        const book = await getBook(slug);
        book.cover = getImageUri(book.cover).uri;
        response.json(book);
    });
});

export const addBooks = functions.https.onRequest(async (request, response) => {
    const promises = data.books.map( (book: Book) => addBook(book))
    const bookids = await Promise.all(promises);
    response.json({ bookids });
});

export const getImage = functions.https.onRequest(async (request, response) => {
    cors(request, response, async () => {
        const file = request.params[0].split('/').slice(-1)[0];
        const imgFile = getImageUri(file);
        try {
            response.send(imgFile.uri);
        } catch(e) {
            response.status(500).send(e.message);
        }
    });    
});

export const saveComment = functions.https.onRequest(async (request, response) => {
    cors(request, response, async () => {
        if(request.method === 'POST'){
            const name = request.body.name;
            const comment = request.body.comment;
            const slug = request.body.slug;
            const result = await updateBook(slug, { name, comment });
            response.json({ result });
        }
    });
});

