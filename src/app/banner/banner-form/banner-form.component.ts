import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-banner-form',
    templateUrl: './banner-form.component.html',
    styleUrls: ['./banner-form.component.css']
})
export class BannerFormComponent implements OnInit {
    formModel: FormGroup

    constructor(public router: Router) {
        const fb = new FormBuilder();
        this.formModel = fb.group({
            name: ['', Validators.required],
            link: ['', Validators.required]
        })
    }

    ngOnInit() {
    }

    cannel() {
        this.router.navigateByUrl('/banners')
    }

    save() {

    }

    onUploadError() {

    }

    onUploadSuccess() {

    }
}
