import { Component, OnInit, Inject, SystemJsNgModuleLoader, ViewChild, AfterViewInit } from '@angular/core';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginVendorComponent } from './login-vendor/login-vendor.component';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { authService } from '../services/auth-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})

export class HeaderComponent implements OnInit {

  @ViewChild(LoginVendorComponent) vendor;

  atVendorPage: boolean;
  VendorisLoggedIn: boolean;
  UserisLoggedIn: boolean;
  UserName: '';
  constructor(private dialog: MatDialog, private router: Router, private authService: authService) {
    this.authService.isVendorPage.subscribe((state: boolean) => {this.atVendorPage = state});
    this.authService.VendorLoggedIn.subscribe((state: boolean) => {this.VendorisLoggedIn = state});
    this.authService.UserLoggedIn.subscribe((state: boolean) => {this.UserisLoggedIn = state});
    this.authService.UserName.subscribe((Name:'') => {this.UserName = Name});
  }

  ngOnInit() {}
  dialogOpened = false;

  openLoginDialog() { 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    if (!this.dialogOpened) {
      if (this.router.url === "/VendorPage") {
        this.dialog.open(LoginVendorComponent, dialogConfig);
      } else {
        this.dialog.open(LoginDialogComponent, dialogConfig);
      }
    } else {
      this.dialog.closeAll();
    }
    this.dialogOpened = !this.dialogOpened;
    console.log(this.router.url);
  }

  closeLoginDialog() {
    this.dialog.closeAll();
    this.dialogOpened = false;
  }
  
  goToRegister() {
    this.router.navigate(['register']);
  }
  goToHome() {
    if (!this.VendorisLoggedIn && this.router.url != "Vendor-Dash") {
      this.router.navigate(['']);
    }
    this.atVendorPage = false;
    
  }
  onLogOut() {
    this.authService.deleteToken();
    this.router.navigate(['']);
    this.VendorisLoggedIn = false;
    this.UserisLoggedIn = false;
    this.dialogOpened = false;
    this.atVendorPage = false;
  }

}
