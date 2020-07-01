import { Component, OnInit, Injectable, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { APP_BASE_HREF } from '@angular/common';

@Injectable({
    providedIn: 'root'
})

export class VendorUpload {

    constructor(private Http: HttpClient) {}
    
    VendorUploadDish(Dish: any) {
        return this.Http.post('http://relish.dyndns-remote.com/RelishBackend/ChefDishUpload.php', Dish);
    }

    VendorProfileUpload(Profile: any) {
        return this.Http.post('http://relish.dyndns-remote.com/RelishBackend/ChefProfileUpload.php', Profile);
    }

    VendorHomeUpload(Home: any) {
        return this.Http.post('http://relish.dyndns-remote.com/RelishBackend/ChefHomeUpload.php', Home)
    }

    VendorAboutUpload(About: any) {
        return this.Http.post('http://relish.dyndns-remote.com/RelishBackend/ChefAboutUpload.php', About)
    }
}