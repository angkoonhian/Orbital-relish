import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { authService } from '../../services/auth-service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  user = {
    username: '',
    password: ''
  }

  constructor(private router: Router, private Http: HttpClient, private authService: authService) { }

  ngOnInit(): void {
  }
  
  @ViewChild('authForm') LoginForm: NgForm;

  SignIn() { 
    this.user.username = this.LoginForm.value.LoginData.username;
    this.user.password = this.LoginForm.value.LoginData.password;
    console.log(this.LoginForm);
    this.authService.CustLogin(this.user)
    .pipe()
    .subscribe( data => {
      this.router.navigate([this.router.url])
      this.authService.changeUserLoginStatus(true);
    }, error => {
      alert("Username of password is incorrect")
    });
  }

  loadRegister() {
    this.router.navigate(['register']);
  }
}
