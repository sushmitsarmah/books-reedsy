<template>
    <!-- <div class="book">
        <div class="row">
            <div class="col-3">
                <h4>{{selectedBook.title}}</h4>
            </div>
        </div>

    </div> -->

<section class="container book-section" >
    <template v-if="selectedBook">
        <div class="row">
            <div class="col-6">
                <h2 class="float-left book-title" v-text="selectedBook.title"></h2>
            </div>
            <div class="col-6">
                <div class="upvote float-right">
                    <p class="upvoted-times" v-text="'Upvoted ' + selectedBook.upvotes + ' times'"></p>
                    <button type="button" class="btn btn-warning upvote-btn">Upvote</button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-2">
                <p class="book-author" v-text="selectedBook.author"></p>
            </div>
        </div>
        <div class="row justify-content-md-center">
            <div class="col-4">
                <img class="img-fluid book-image" :src="selectedBook.cover" />
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h3 v-text="'Synopsis'"></h3>
                <p class="synopsis" v-text="selectedBook.synopsis"></p>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <p class="rating" v-text="'Rating: ' + selectedBook.rating + '/10'"></p>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-12">
                <h4>Comments</h4>
                <div class="comments-display" v-for="(row, i) of comments" :key="i">
                    <h5 v-text="row.name"></h5>
                    <p v-text="row.comment"></p>
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-12">
                <h4>Post a Comment</h4>
                <form name="messageForm" @submit="onPostComment">
                    <div class="form-group row">
                        <label for="name" class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" placeholder="Enter Your name" name="name" v-model="commentName">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="name" class="col-sm-2 col-form-label">Comment</label>
                        <div class="col-sm-10">
                            <textarea type="text" class="form-control" placeholder="Enter Your message" name="message" v-model="commentMessage" rows="10" cols="100"></textarea>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="offset-sm-2 col-sm-10">
                            <button type="submit" class="btn btn-outline-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </template>
    <p v-if="!selectedBook">Loading Book Data ...</p>
</section>


</template>

<script>

import { API } from '../config.json';

// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "home",
    data: () => ({
        selectedBook: {},
        comments: [],
        commentName: '',
        commentMessage: ''
    }),
    components: {
        HelloWorld
    },
    mounted() {
        this.fetchBook();
    },
    methods: {
        async fetchBook() {
            const url = `${API}/books/${this.$route.params.slug}`;
            const resp = await this.axios.get(url);
            this.selectedBook = resp.data;
            this.comments = this.selectedBook.comments ? this.selectedBook.comments : [];
            console.log(this.selectedBook);
        },
        async onPostComment(e) {
            e.preventDefault();
            const url = `${API}/add-book-comment`;
            const body = {
                slug: this.$route.params.slug,
                name: this.commentName,
                comment: this.commentMessage
            };
            const resp = await this.axios.post(url, body);
            this.commentName = '';
            this.commentMessage = '';
            this.fetchBook();
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../variables';

.book-section {
    -webkit-box-shadow: 0px 0px 10px 1px $main-container-shadow;
    -moz-box-shadow: 0px 0px 10px 1px $main-container-shadow;
    box-shadow: 0px 0px 10px 1px $main-container-shadow;
    padding-top: 15px;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 10px;
    background-color: #fff;

    .book-title {
        color: $book-title;
    }

    .upvote {
        .upvoted-times {
            display: inline-block;
            margin-right: 10px;
        }

        .upvote-btn {
            display: inline-block;
            background-color: $title-color;
            border-color: darken($title-color, 10%);
            color: #fff;
            &:hover {
                background-color: darken($title-color, 10%);
            }
        }
    }

    .book-author {
        font-style: italic;
    }

    .book-image {
        width: 100%;
        border-radius: 10px;
    }

    .rating {
        font-weight: bold;
        font-size: 15px;
    }

    .synopsis {
        white-space: pre-line
    }

}
</style>
