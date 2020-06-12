import { Component, OnInit, Injectable, Output, ViewChild, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map, first } from 'rxjs/operators';
import { authService } from '../../services/auth-service';
import { Vendor } from 'src/app/services/Vendor-model';

@Component({
  selector: 'app-login-vendor',
  templateUrl: './login-vendor.component.html',
  styleUrls: ['./login-vendor.component.css']
})
export class LoginVendorComponent implements OnInit {

  LoggedInVendorID = '';
  VendorLogin = {
    username: '',
    password: ''
  }
  constructor(private router: Router, private Http: HttpClient, private authService: authService) { }

  @ViewChild('authForm') LoginForm: NgForm;

  ngOnInit(): void {
  }

  onLogin() {
    this.VendorLogin.username = this.LoginForm.value.LoginData.username;
    this.VendorLogin.password = this.LoginForm.value.LoginData.password;
    console.log(this.LoginForm);
    this.authService.VendorLogin(this.VendorLogin)
    .pipe()
    .subscribe( data => {
      console.log(data);
      this.authService.changeVendor(String(Object.values(data[0])[0]));
      this.router.navigate(['/Vendor-Dash']);
      this.authService.changeVendorLoginStatus(true);
    },
    error => {
      alert("Username of password is incorrect")
    });
    this.LoginForm.reset();
  }

  loadRegister() {
    this.router.navigate(['register']);
  }
}