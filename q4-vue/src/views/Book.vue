<template>
    <div class="book">
        <div class="row">
            <div class="col-3">
                <h4>{{selectedBook.title}}</h4>
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
        selectedBook: {}
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
            console.log(this.selectedBook);
        }
    }
};
</script>
