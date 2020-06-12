import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PosterComponent } from './home/poster/poster.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginDialogComponent } from './header/login-dialog/login-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ConsumerComponent } from './register/consumer/consumer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { authService } from './services/auth-service';
import {MatTabsModule} from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { authGuard } from './services/auth-guard';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { VendorPageComponent } from './vendor-page/vendor-page.component';
import { LoginVendorComponent } from './header/login-vendor/login-vendor.component';
import { DetailsComponent } from './vendor-page/details/details.component';
import { VendorSignupComponent } from './vendor-page/vendor-signup/vendor-signup.component';
import { VendorDashboardComponent } from './vendor-dashboard/vendor-dashboard.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {MatRadioModule} from '@angular/material/radio';
import { FooterComponent } from './footer/footer.component';
import { DishUploadComponent } from './vendor-dashboard/dish-upload/dish-upload.component';
import { ShopDataComponent } from './vendor-dashboard/shop-data/shop-data.component';
import { ShopMenuComponent } from './vendor-dashboard/shop-menu/shop-menu.component';
import { JoinUsComponent } from './vendor-page/details/join-us/join-us.component';
import { OverallProcessComponent } from './vendor-page/details/overall-process/overall-process.component';
import { StoresComponent } from './stores/stores.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Vendor-Dash', component: VendorDashboardComponent, canActivate: [authGuard]},
  { path: 'register', component: RegisterComponent, children: [
    { path: 'consumer', component: ConsumerComponent}
  ]},
  { path: 'VendorPage', component: VendorPageComponent},
  { path: 'Stores', component: StoresComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PosterComponent,
    LoginDialogComponent,
    RegisterComponent,
    ConsumerComponent,
    VendorPageComponent,
    LoginVendorComponent,
    DetailsComponent,
    VendorSignupComponent,
    VendorDashboardComponent,
    FooterComponent,
    DishUploadComponent,
    ShopDataComponent,
    ShopMenuComponent,
    JoinUsComponent,
    OverallProcessComponent,
    StoresComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatRadioModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    HttpClientModule,
    MatTabsModule,
    MatExpansionModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyA_mX71QcTMRtCUVbjb3hpp2DV0V7Cx1lw'
    }),
    BsDropdownModule,
    MatSidenavModule
  ],
  entryComponents: [
    LoginDialogComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
