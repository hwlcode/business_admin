import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {number} from '../../validators/validators';
import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';

import {Http, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
    formModel: FormGroup;
    product: Product = new Product('', '', '', '', 0); // 数据还没有回来之前给一个默认值
    isSave: Boolean = true;
    config: DropzoneConfigInterface = {
        url: '/api/upload',
        maxFiles: 1,
        acceptedFiles: 'image/*'
    };

    constructor(public router: Router, public http: Http, public routeInfo: ActivatedRoute) {
    }

    ngOnInit() {
        const fb = new FormBuilder();
        const self = this;
        this.formModel = fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            price: ['', [number]],
            banner: [''],
            code: [0]
        });

        const id = this.routeInfo.snapshot.params['id'];
        this.getProduct(id).subscribe(
            res => {
                if (id != 0) {
                    self.isSave = false;
                }

                this.formModel.reset({
                    name: res.name,
                    price: res.price,
                    code: res.code
                });
                this.product = res;
            }
        );
    }

    onUploadError(event: any) {
        console.log(event);
    }

    onUploadSuccess(event: any) {
        this.formModel.controls['banner'].setValue(event[1].id);
    }

    cannel() {
        this.router.navigateByUrl('/products')
    }

    save() {
        if (this.formModel.valid && this.formModel.value.banner !== null) {
            const url = '/api/saveProduct';
            const self = this;
            const params = new URLSearchParams();
            params.append('name', this.formModel.value.name);
            params.append('price', this.formModel.value.price);
            params.append('banner', this.formModel.value.banner);
            params.append('code', this.formModel.value.code);
console.log(params);
            this.http.post(url, params)
                .map(res => res.json())
                .subscribe(function (data) {
                    if (data.code === 0) {
                        self.router.navigateByUrl('/products');
                    }
                });
        }
    }

    getProduct(id: string): Observable<Product> {
        return this.http.get('/api/product/' + id).map(res => res.json());
    }

    update(product: Product) {
        if (this.formModel.valid && this.formModel.value.banner !== null) {
            const url = '/api/updateProduct/' + product._id;
            const self = this;
            const params = new URLSearchParams();
            params.append('name', this.formModel.value.name);
            params.append('price', this.formModel.value.price);
            params.append('banner', this.formModel.value.banner);
            params.append('code', this.formModel.value.code);

            this.http.post(url, params)
                .map(res => res.json())
                .subscribe(function (data) {
                    if (data.code === 0) {
                        self.router.navigateByUrl('/products');
                    }
                });
        }
    }
}

class Product {
    constructor(public _id: string,
                public banner: string,
                public name: string,
                public price: string,
                public code: number) {
    }
}
