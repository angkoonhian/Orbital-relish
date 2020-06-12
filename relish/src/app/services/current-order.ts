import { Component, OnInit, Injectable, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { Vendor } from './Vendor-model';
import { Order } from './Order-model';

@Injectable({
    providedIn: 'root'
})

export class currentOrder {
    Orders: Order[] = [];
}