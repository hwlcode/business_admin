import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-banner-list',
    templateUrl: './banner-list.component.html',
    styleUrls: ['./banner-list.component.css']
})
export class BannerListComponent implements OnInit {

    constructor(public router: Router) {
    }

    ngOnInit() {
    }

    nav(url: string) {
        this.router.navigateByUrl(url);
    }

    create() {
        this.router.navigateByUrl('/banner/0');
    }

}
