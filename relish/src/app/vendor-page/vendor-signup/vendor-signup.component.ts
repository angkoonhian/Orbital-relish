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
interface Cuisine {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-vendor-signup',
  templateUrl: './vendor-signup.component.html',
  styleUrls: ['./vendor-signup.component.css']
})
export class VendorSignupComponent implements OnInit {

  selectedValue: String;

  cuisines: Cuisine[] = [
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

  @ViewChild('v', { static: false }) signupForm: NgForm;
  user = {
    username: '',
    password:'',
    email: '',
    phoneNumber: '',
    address: '',
    postalCode: '',
    cuisine: ''
  };
  StringifiedUser: any;
  submitted = false;

  onSubmit() {
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.password = this.signupForm.value.userData.password;
    this.user.email = this.signupForm.value.userData.email;
    this.user.phoneNumber = this.signupForm.value.userData.phoneNumber;
    this.user.address = this.signupForm.value.userData.address;
    this.user.postalCode = this.signupForm.value.userData.postalCode;
    this.user.cuisine = this.signupForm.value.userData.cuisine;

    this.signupForm.reset();
    this.onRegister(this.user);
  }

  onRegister(user: {username: string, password: string, email: string, phoneNumber: string,
    address: string, postalCode: string, cuisine: string} ) {
      this.http.post<any>("http://relish.dyndns-remote.com/RelishBackend/ChefRegister.php", user)
      .subscribe(resData => {
        console.log(resData)
      });
    }
    
  
  ngOnInit(): void {
  }

}

