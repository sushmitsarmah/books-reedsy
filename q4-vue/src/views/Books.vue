<template>
    <section class="container books-section">
        <div class="row justify-content-md-center">
            <div class="col col-sm-8 col-md-6 col-lg-4 col-xl-4">
                <h2 class="books-main-title" v-text="title"></h2>
            </div>
        </div>

        <div class="row" v-if="!loading">
            <div class="col col-sm-8 col-md-6 col-lg-4 col-xl-4">
                <input type="text" class="form-control" v-model="searchText" v-on:keyup="filterBooks()" placeholder="Search Books by Title / Synopsis"/>
            </div>
            <div class="col col-sm-4 col-md-6 offset-lg-4 offset-xl-4 col-lg-4 col-xl-4">
                <!-- <pagination-controls (pageChange)="currentPage = $event"></pagination-controls> -->
                <b-pagination
                    :total-rows="rows"
                    v-model="currentPage"
                    :per-page="perPage"
                    aria-controls="my-table"
                ></b-pagination>
            </div>
        </div>

        <div class="row" v-if="books.length === 0 && loading">
            <div class="col col-sm-8 col-md-6 col-lg-4 col-xl-4">
                <p>Loading books data ....</p>
            </div>
        </div>

        <div v-for="(book, i) of books" :key="i">
            <div class="row book-row" :class="{'even-row': (i%2 === 0), 'odd-row': (i%2 === 1)}">
                <div class="col-8 book-text-col">
                    <div class="row">
                        <div class="col">
                            <router-link class="book-title" :to="book.derivedUrl">
                                <h3>
                                    <span class="derived-title" v-text="book.derivedTitle"></span>
                                    <span class="derived-rating" v-text="book.derivedRating"></span>
                                </h3>
                            </router-link>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <p class="book-author" v-text="book.author"></p>
                        </div>
                    </div> 
                    <div class="row">
                        <div class="col">
                            <p v-text="book.derivedSynopsis"></p>
                        </div>
                    </div>
                    <div class="row upvote-row">
                        <div class="col-6 col-sm-2">
                            <button type="button" class="btn btn-warning btn-upvote">Upvote</button>
                        </div>
                        <div class="col-6 col-sm-3">
                            <p class="upvoted-times" v-text="'Upvoted ' + book.upvotes + ' times'"></p>
                        </div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="row">
                        <div class="col">
                            <router-link :to="book.derivedUrl">
                                <img class="img-fluid book-image" :src="book.cover" />
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>

</template>

<script>

import { API } from '../config.json';

// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import * as _ from 'lodash';

export default {
    name: "books",
    data: () => ({
        title: 'Top books of all time',
        books: [],
        booksOrig: [],
        searchText: '',
        currentPage: 1,
        perPage: 5,
        rows: 0,
        loading: false
    }),    
    components: {
        HelloWorld
    },
    mounted() {
        this.fetchBooks();
    },
    watch: {
        currentPage(newValue, oldValue) {
            this.filterBooks();
        }
    },
    methods: {
        async fetchBooks() {
            const url = `${API}/books`;
            this.loading = true;
            const resp = await this.axios.get(url);
            this.loading = false;
            this.books = resp.data.books;

            this.books = this.books
                .sort( (a, b) => +b.rating - +a.rating)
                .map( (book, index) => {
                    book.derivedTitle = `${index + 1}. ${book.title}`;
                    book.derivedRating = `(${book.rating}/10)`;
                    book.derivedUrl = `/book/${book.slug}`;
                    book.derivedSynopsis = book.synopsis.slice(0, 200) + '...';
                    return book;
                });

            this.booksOrig = _.clone(this.books);

            this.rows = this.booksOrig.length;

            this.books = this.booksOrig.slice( (this.currentPage - 1) * this.perPage, this.perPage);

            console.log(this.books);
        },
        navigateTo(book) {
            console.log(book)
            this.$router.push({ path: `/books/${book.slug}` })
        },
        filterBooks() {
            const searchText = this.searchText.toLowerCase();
            this.books = _.filter(this.booksOrig, book => {
                return book.title.toLowerCase().indexOf(searchText) !== -1 ||
                    book.synopsis.toLowerCase().indexOf(searchText) !== -1 ||
                    !this.searchText;
            });
            this.paginate(this.currentPage);
        },
        paginate(page) {
            const start = (page - 1) * this.perPage;
            const end = start + this.perPage;
            this.books = this.books.slice(start, end);
        }
    }
    
};
</script>

<style lang="scss" scoped>
@import '../variables';

.books-main-title {
    color: $title-color;
}

.books-section {
    -webkit-box-shadow: 0px 0px 10px 1px $main-container-shadow;
    -moz-box-shadow: 0px 0px 10px 1px $main-container-shadow;
    box-shadow: 0px 0px 10px 1px $main-container-shadow;
    padding-top: 15px;
    border-radius: 10px;
    background-color: #fff;
}

.btn-upvote {
    background-color: $title-color;
    border-color: darken($title-color, 10%);
    color: #fff;
    &:hover {
        background-color: darken($title-color, 10%);
    }
}

.upvoted-times {
    margin-top: 5px;
}

.even-row {
    background-color: $section-background;
}

.odd-row {
    background-color: #fff;
}

.book-row {
    margin-bottom: 20px;
    padding-top: 20px;
    padding-bottom: 20px;

    .upvote-row {
        margin-top: 5em;
    }

    .book-title {
        color: $book-title;
        .derived-rating {
            margin-left: 10px;
            color: $text-color;
        }
    }
    .book-author {
        font-style: italic;
    }
    .book-image {
        width: 50%;
        border-radius: 10px;
    }
}

</style>
