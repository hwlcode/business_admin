import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
    orderList: any;
    page: Number = 1;
    collectionSize: Number = 0;
    pageSize: Number = 10;
    isShow: Boolean = false;
    targetOrderId: String;

    constructor(public http: Http) {
    }

    ngOnInit() {
        this.getOrderList();
    }

    getOrderList() {
        this.http.get('/api/order/list').map(res => res.json()).subscribe(data => {
            if (data.code === 0) {
                this.orderList = data.orders;
                this.orderList.map(order => {
                    order.products = JSON.parse(order.products);
                });
                this.collectionSize = data.total;
            }
        })
    }

    pageChange(page: number) {
        this.http.get('/api/order/list?q=' + page).map(res => res.json()).subscribe(res => {
            if (res.code === 0) {
                this.orderList = res.orders;
                this.orderList.map(order => {
                    order.products = JSON.parse(order.products);
                });
                this.collectionSize = res.total;
            }
        });
    }

    cannel() {
        this.isShow = false;
    }

    open(id) {
        this.isShow = true;
        this.targetOrderId = id;
        console.log(this.targetOrderId);
    }

    saveOrder() {
        this.isShow = false;
        // 更改订单状态
        this.http.get('/api/order/comfirmorder?id=' + this.targetOrderId).map(res => res.json())
            .subscribe(json => {
                if (json.code === 0) {
                    window.location.reload();
                }
            });
    }
}
