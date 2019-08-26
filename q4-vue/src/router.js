import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Books from "./views/Books.vue";
import Book from "./views/Book.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/books",
            name: "books",
            component: Books
        },
        {
            path: "/books/:slug",
            name: "book",
            component: Book
        },        
        {
            path: "/about",
            name: "about",
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import(/* webpackChunkName: "about" */ "./views/About.vue")
        }
    ]
});
