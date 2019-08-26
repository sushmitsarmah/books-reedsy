import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import {
    Book
} from './interfaces';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const booksCollection = 'Book';

const addBook = async (bookObj: Book): Promise<any> => {
    return db.collection(booksCollection).add(bookObj)
        .then((docRef: admin.firestore.DocumentReference) => {
            return docRef.id;
        });
};

const getBook = async (slug: string): Promise<Book> => {
    return db.collection(booksCollection).where('slug', '==', slug).get()
        .then((snapshot: admin.firestore.QuerySnapshot) => {
            const doc = snapshot.docs[0];
            if (doc) {
                const bookObj = doc.data() as Book;
                bookObj.id = doc.id;
                return bookObj;
            } else {
                return {} as Book;
            }
        });
};

const getBooks = async (): Promise<Book[]> => {
    const snapshot: admin.firestore.QuerySnapshot = await db.collection(booksCollection).get();
    const books: Book[] = snapshot.docs.map(doc => {
        return doc.data() as Book;
    });
    return books;
};

const updateBook = async (slug: string, commentObj: any): Promise<any> => {
    const book = await getBook(slug);
    if(book.comments) {
        book.comments.push(commentObj)
    } else {
        book.comments = [commentObj];
    }

    const id = book.id ? book.id : '';

    return db.collection(booksCollection).doc(id).update(book);
};

export {
    addBook,
    getBook,
    getBooks,
    updateBook
};