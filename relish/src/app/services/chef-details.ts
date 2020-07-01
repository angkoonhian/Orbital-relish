import { Component, OnInit, Injectable, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class chefDetails {

    constructor(private Http: HttpClient) {}

    chefDash(VendorID: string) {
        return this.Http.post<any>('http://relish.dyndns-remote.com/RelishBackend/StoreDetails.php', VendorID);
    }
}