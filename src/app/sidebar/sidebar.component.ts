import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menus: Array<Menu>;
    currentMenuId: number;

    constructor(public router: Router) {
    }

    ngOnInit() {
        this.menus = [
            new Menu(1, '首页', 'dashboard', 'dashboard'),
            new Menu(2, '订单管理', 'products', 'files-o'),
            new Menu(3, '产品管理', 'products', 'th'),
            new Menu(4, 'banner管理', 'banners', 'image'),
            new Menu(5, '客户管理', 'products', 'users'),
            new Menu(6, '积分管理', 'gift', 'th')
        ]
    }

    nav(menu: Menu) {
        this.router.navigateByUrl(menu.link);
        this.currentMenuId = menu.id;
    }
}

export class Menu {
    constructor(
        public id: number,
        public name: string,
        public link: string,
        public icon: string
    ) {

    }
}
