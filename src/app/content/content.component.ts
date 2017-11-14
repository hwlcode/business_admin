import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import 'rxjs/add/operator/filter'

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
    pageTitle = '';

    constructor(public router: Router) {
        router.events.filter(event => event instanceof NavigationEnd)
            .subscribe((event: NavigationEnd) => {
                if (event.url === '/dashboard') {
                    this.pageTitle = '工作台'
                }else if (event.url.startsWith( '/product')) {
                    this.pageTitle = '产品管理'
                }else if (event.url.startsWith( '/banner')) {
                    this.pageTitle = 'Banner管理'
                }else if (event.url.startsWith( '/custom')) {
                    this.pageTitle = '客户管理'
                }else if (event.url.startsWith( '/order')) {
                    this.pageTitle = '订单管理'
                }
            })
    }

    ngOnInit() {
    }

}
