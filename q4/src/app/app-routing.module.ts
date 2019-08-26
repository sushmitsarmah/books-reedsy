import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { BooksComponent } from './components/books/books.component';
import { BookComponent } from './components/book/book.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'books',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'book/:id',
        component: BookComponent
    },
    {
        path: 'books',
        component: BooksComponent
    },
    {
        path: '**',
        component: PagenotfoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(
        routes,
        {
            useHash: true,
            enableTracing: false
        }
    )],
    exports: [RouterModule]
})
export class AppRoutingModule { }
