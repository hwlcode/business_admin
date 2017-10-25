import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import * as moment from 'moment';

moment.locale('zh-cn');

@Component({
    selector: 'app-banner-list',
    templateUrl: './banner-list.component.html',
    styleUrls: ['./banner-list.component.css']
})
export class BannerListComponent implements OnInit {
    public banners;
    page: Number = 1;
    collectionSize: Number = 0;
    pageSize: Number = 3;

    constructor(public router: Router, public http: Http) {

    }

    ngOnInit() {
        this.getBanners().subscribe(
            res => {
                if (res.code === 0) {
                    const json = res.data;
                    json.map(item => {
                        item.createdAt = moment(new Date(item.createdAt)).format('YYYY-MM-DD hh:mm');
                    })
                    this.banners = json;
                    this.collectionSize = res.total;
                }
            }
        )
    }

    create() {
        this.router.navigateByUrl('/banner/0');
    }

    getBanners(page: number = 1) {
        return this.http.get('/api/banners?q=' + page).map(res => res.json());
    }

    pageChange(page: number) {
        this.getBanners(page).subscribe(
            res => {
                if (res.code === 0) {
                    const json = res.data;
                    json.map(item => {
                        item.createdAt = moment(new Date(item.createdAt)).format('YYYY-MM-DD hh:mm');
                    })
                    this.banners = json;
                    this.collectionSize = res.total;
                }
            }
        );
    }

    remove(banner) {
        this.http.get('/api/banner/delete/' + banner._id)
            .map(res => res.json())
            .subscribe(
                res => {
                    if (res.code === 0) {
                        this.banners = res.data;
                    }
                }
            );
    }
}
