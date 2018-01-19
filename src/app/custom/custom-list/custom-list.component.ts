import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';

@Component({
    selector: 'app-custom-list',
    templateUrl: './custom-list.component.html',
    styleUrls: ['./custom-list.component.css']
})
export class CustomListComponent implements OnInit {

    public users;
    page: Number = 1;
    collectionSize: Number = 0;
    pageSize: Number = 3;

    constructor(public router: Router, public http: Http) {
    }

    ngOnInit() {
        this.getUsers().subscribe(res => {
            if (res.code === 0) {
                this.users = res.data;
                this.users.map(user => {
                    if (user.avatar == null) {
                        user.avatar = 'assets/user2-160x160.jpg'
                    } else {
                        user.avatar = user.avatar.path;
                    }
                })
                this.collectionSize = res.total;
            }
        });
    }

    getUsers(page: number = 1) {
        return this.http.get('/api/users?q=' + page).map(res => res.json());
    }

    pageChange(page: number) {
        this.getUsers(page).subscribe(res => {
            if (res.code === 0) {
                this.users = res.data;
                this.collectionSize = res.total;
            }
        });
    }
}
