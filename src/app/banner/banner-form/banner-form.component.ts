import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {Http, URLSearchParams} from '@angular/http';

@Component({
    selector: 'app-banner-form',
    templateUrl: './banner-form.component.html',
    styleUrls: ['./banner-form.component.css']
})
export class BannerFormComponent implements OnInit {
    formModel: FormGroup;
    config: DropzoneConfigInterface = {
        url: '/api/upload',
        maxFiles: 1,
        acceptedFiles: 'image/*'
    };

    constructor(public router: Router, public http: Http) {
        const fb = new FormBuilder();
        this.formModel = fb.group({
            name: ['', Validators.required],
            link: ['', Validators.required],
            banner: ['']
        })
    }

    ngOnInit() {
    }

    save() {
        if (this.formModel.valid && this.formModel.value.banner !== null) {
            const url = '/api/saveBanner';
            const self = this;
            const params = new URLSearchParams();
            console.log(this.formModel.value.name);
            params.append('name', this.formModel.value.name);
            params.append('link', this.formModel.value.link);
            params.append('banner', this.formModel.value.banner);

            this.http.post(url, params)
                .map(res => res.json())
                .subscribe(function (data) {
                    if (data.code === 0) {
                        self.router.navigateByUrl('/banners');
                    }
                });
        }
    }

    onUploadError(event: any) {
        console.log(event);
    }

    onUploadSuccess(event: any) {
        this.formModel.value.banner = event[1].id;
    }
}
