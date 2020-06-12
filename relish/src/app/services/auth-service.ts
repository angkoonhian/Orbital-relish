import { Component, OnInit, Injectable, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { Vendor } from './Vendor-model';

@Injectable({
    providedIn: 'root'
})

export class authService {
    isVendorPage: Observable<boolean>;
    private atVendorPage: Subject<boolean>;
    VendorLoggedIn: Observable<boolean>;
    private VendorIsLoggedIn: Subject<boolean>;
    UserLoggedIn: Observable<boolean>;
    private UserIsLoggedIn: Subject<boolean>;

    constructor(private Http: HttpClient) {
        this.atVendorPage = new Subject<boolean>();
        this.isVendorPage = this.atVendorPage.asObservable();
        this.VendorIsLoggedIn = new Subject<boolean>();
        this.VendorLoggedIn = this.VendorIsLoggedIn.asObservable();
        this.UserIsLoggedIn = new Subject<boolean>();
        this.UserLoggedIn = this.UserIsLoggedIn.asObservable();
    }

    changeUserLoginStatus(state: boolean) {
        this.UserIsLoggedIn.next(state);
    }

    changeVendorPageStatus(state: boolean) {
        this.atVendorPage.next(state);
    }

    changeVendorLoginStatus(state: boolean) {
        this.VendorIsLoggedIn.next(state);
    }

    private currentStoreID = new BehaviorSubject('');
    StoreID = this.currentStoreID.asObservable();

    changeStore(StoreID: string) {
        this.currentStoreID.next(StoreID);
    }

    redirectUrl: string;
    private loginVendorID = new BehaviorSubject('');
    currentVendorID = this.loginVendorID.asObservable();

    changeVendor(LoggedInVendor: string) {
        this.loginVendorID.next(LoggedInVendor);
    }

    @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

    public CustLogin(user: {username: string, password: string}) {
        return this.Http.post<any>('http://relish.dyndns-remote.com/RelishBackend/CustLogin.php', user)
        .pipe(map(custModule => {
            this.setToken(custModule[0].userId);
            this.getLoggedInName.emit(true);
            return custModule;
        }));
    }

    public VendorLogin(Vendor: {username: string, password: string}) {
        return this.Http.post<any>('http://relish.dyndns-remote.com/RelishBackend/VendorLogin.php', Vendor)
        .pipe(map(vendorModule => {
            this.setToken(vendorModule[0].Email);
            this.getLoggedInName.emit(true);
            return vendorModule;
        }));
    }

    setToken(token:string) {
        localStorage.setItem('token', token);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    deleteToken() {
        localStorage.clear();
    }

    isLoggedIn() {
        const custToken = this.getToken();
        if (custToken != null) {
            return true;
        } else {
            return false;
        }
    }
}