import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

interface Preference {
  value: String;
  viewValue: String;
}

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.css']
})
export class ConsumerComponent implements OnInit {

  selectedValue: String;
  preferences: Preference[] = [
    {value: 'Malay Cuisine', viewValue: 'Malay Cuisine'},
    {value: 'Chinese Cuisine', viewValue: 'Chinese Cuisine'},
    {value: 'Nyonya Cuisine', viewValue: 'Nyonya Cuisine'},
    {value: 'Western Cuisine', viewValue: 'Western Cuisine'},
    {value: 'French Cuisine', viewValue: 'French Cuisine'}
  ]

  phoneFormControl = new FormControl('', [
    Validators.required,
  ])
  postalFormControl = new FormControl('', [
    Validators.required,
  ])
  addressFormControl = new FormControl('', [
    Validators.required,
  ])
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  usernameFormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();
  constructor(private http: HttpClient) { }
  @ViewChild('c', { static: false }) signupForm: NgForm;
  user = {
    username: '',
    password:'',
    repassword: '',
    email: '',
    phoneNumber: '',
    preference: ''
  };
  submitted = false;

  onSubmit() {
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.password = this.signupForm.value.userData.password;
    this.user.repassword = this.signupForm.value.userData.repassword;
    this.user.email = this.signupForm.value.userData.email;
    this.user.phoneNumber = this.signupForm.value.userData.phoneNumber;
    this.user.preference = this.signupForm.value.preference;

    this.signupForm.reset();
    this.onRegister(this.user);
  }

  onRegister(user: { username: string, password: string, email: string, phoneNumber: string,
    preference: string }) {
      console.log(user);
      this.http.post('http://relish.dyndns-remote.com/RelishBackend/ConsumerRegister.php', user)
      .pipe()
      .subscribe(responseData => {
        console.log(responseData);
      })
    }

  ngOnInit(): void {
  }

}
