import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { authService } from '../services/auth-service';
import { Vendor } from '../services/Vendor-model';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.css']
})
export class VendorDashboardComponent implements OnInit {

  constructor(private route: ActivatedRoute, private authService: authService) { }

  currentVendorID = '';
  
  ngOnInit(): void {
    this.authService.currentVendorID.subscribe(VendorID => this.currentVendorID = VendorID)
  }


}
