import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-productlist',
    templateUrl: './productlist.component.html',
    styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
    public products;
    page: Number = 1;
    collectionSize: Number = 0;
    pageSize: Number = 3;

    constructor(public router: Router, public http: Http) {
    }

    ngOnInit() {
        this.getProducts().subscribe(res => {
            if (res.code === 0) {
                this.products = res.data;
                this.collectionSize = res.total;
            }
        });
    }

    create() {
        this.router.navigateByUrl('/product/0')
    }

    update(product) {
        this.router.navigateByUrl('/product/' + product._id);
    }

    remove(product) {
        this.http.get('/api/delete/' + product._id)
            .map(res => res.json())
            .subscribe(
                res => {
                    if (res.code === 0) {
                        this.products = res.data;
                    }
                }
            );
    }

    getProducts(page: number = 1) {
        return this.http.get('/api/productList?q=' + page).map(res => res.json());
    }

    pageChange(page: number) {
        this.getProducts(page).subscribe(res => {
            if (res.code === 0) {
                this.products = res.data;
                this.collectionSize = res.total;
            }
        });
    }
}
