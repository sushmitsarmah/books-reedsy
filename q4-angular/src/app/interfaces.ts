export interface Book {
    author: string;
    cover: string;
    rating: string;
    slug: string;
    synopsis: string;
    title: string;
    derivedTitle?: string;
    derivedUrl?: string;
    derivedRating?: string;
    derivedSynopsis?: string;
    comments?: any[];
    upvoted: boolean;
    upvotes: number;
}

export interface BooksResponse {
    books: Book[];
    meta: { count: number };
}
