import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {ContentComponent} from './content/content.component';
import {RightbarComponent} from './rightbar/rightbar.component';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HttpModule} from '@angular/http';
import {ProductlistComponent} from './products/productlist/productlist.component';
import {ProductFormComponent} from './products/product-form/product-form.component';
import {DropzoneModule} from 'ngx-dropzone-wrapper';
import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {CustomListComponent} from './custom/custom-list/custom-list.component';
import {OrderListComponent} from './order/order-list/order-list.component';
import {BannerListComponent} from './banner/banner-list/banner-list.component';
import {IntegralManageComponent} from './integral/integral-manage/integral-manage.component';
import {BannerFormComponent} from './banner/banner-form/banner-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './user/login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import {NgZorroAntdModule} from 'ng-zorro-antd';

const routeConfig: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'products', component: ProductlistComponent},
    {path: 'product/:id', component: ProductFormComponent},
    {path: 'banners', component: BannerListComponent},
    {path: 'banner/:id', component: BannerFormComponent},
    {path: 'login', component: LoginComponent},
    {path: 'custom', component: CustomListComponent},
    {path: 'order', component: OrderListComponent}
]

const DROPZONE_CONFIG: DropzoneConfigInterface = {
    url: '/api/upload',
    maxFiles: 1,
    acceptedFiles: 'image/*'
};

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        ContentComponent,
        RightbarComponent,
        DashboardComponent,
        ProductlistComponent,
        ProductFormComponent,
        CustomListComponent,
        OrderListComponent,
        BannerListComponent,
        IntegralManageComponent,
        BannerFormComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        FormsModule, // 模板式表单
        ReactiveFormsModule, // 响应式表单
        NgbModule.forRoot(), // bootstrap 后台框架
        // NgZorroAntdModule.forRoot(), // 蚂蚁后台框架
        DropzoneModule.forRoot(DROPZONE_CONFIG), // 拖拉上传
        RouterModule.forRoot(routeConfig)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
