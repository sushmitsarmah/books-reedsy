import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    public title = 'Reedsy Books';
    public isNavbarCollapsed = false;

    public links = [
        // { title: 'Home', url: 'home', active: true },
        { title: 'Books', url: 'books', active: true }
    ];

    constructor() { }

    ngOnInit() {
    }

    linkClicked(link: any) {
        this.links = this.links.map(d => {
            if (d.url === link.url) {
                d.active = true;
            } else {
                d.active = false;
            }
            return d;
        });
    }

}
