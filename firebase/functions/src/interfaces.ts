export interface Book {
    id?: string;
    author: string;
    cover: string;
    rating: string;
    slug: string;
    synopsis: string;
    title: string;
    upvoted: boolean;
    upvotes: number;
    comments?: { name: string, comment: string}[];
};

export interface Books {
    books: Book[];
    meta: { count: number };
}