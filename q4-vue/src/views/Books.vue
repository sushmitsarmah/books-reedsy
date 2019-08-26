<template>
    <div class="books">
    <div class="row" v-for="(book, i) in books" :key="i">
        <div class="col-3">
            <h4 @click="navigateTo(book)">{{book.title}}</h4>
        </div>
    </div>

    </div>
</template>

<script>

const API = 'http://localhost:3000';

// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "home",
    data: () => ({
        books: []
    }),    
    components: {
        HelloWorld
    },
    mounted() {
        this.fetchBooks();
    },
    methods: {
        async fetchBooks() {
            const url = `${API}/books`;
            const resp = await this.axios.get(url);
            this.books = resp.data.books;
            console.log(this.books);
        },
        navigateTo(book) {
            console.log(book)
            this.$router.push({ path: `/books/${book.slug}` })
        }
    }
    
};
</script>
