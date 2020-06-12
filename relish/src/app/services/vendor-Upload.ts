import { Component, OnInit, Injectable, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class VendorUpload {

    constructor(private Http: HttpClient) {}
    
    VendorUploadDish(Dish: {Name: string, Price: string, Description: string}) {
        return this.Http.post('http://relish.dyndns-remote.com/RelishBackend/VendorUpload.php', Dish);
    }
}