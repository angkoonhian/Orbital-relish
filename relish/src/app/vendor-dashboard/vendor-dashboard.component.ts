import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { authService } from '../services/auth-service';
import { vendor } from '../services/Vendor-model';
import { chefDetails } from '../services/chef-details';
import { VendorUpload } from '../services/vendor-Upload';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChefAboutUploadComponent } from './chef-about-upload/chef-about-upload.component';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.css']
})
export class VendorDashboardComponent implements OnInit {

  constructor(private route: ActivatedRoute, private authService: authService, private chefDetails: chefDetails,
    private vendorUpload: VendorUpload, public dialog: MatDialog) { }

  currentVendorID = '';
  StoreName = '';
  Image = 'http://relish.dyndns-remote.com/RelishBackend/';
  HomeImage = '';
  ProfileImage = '';
  
  ngOnInit(): void {
    this.authService.currentVendorID.subscribe(VendorID => this.currentVendorID = VendorID)
    this.chefDetails.chefDash(this.currentVendorID)
    .subscribe(store => {
      this.HomeImage = store.HomePic;
      this.ProfileImage = store.ProfileImage;
      this.StoreName = store.VendorName;
    })
  }

  onProfileChanged(files) {
    const formData = new FormData();
    formData.append('ProfileImage', files[0], this.currentVendorID);
    console.log(this.currentVendorID);
    this.vendorUpload.VendorProfileUpload(formData)
    .subscribe(res => {
      alert("Profile Successfully updated!")
    });
    setTimeout(() => {
      this.chefDetails.chefDash(this.currentVendorID)
      .subscribe(store => {
      this.ProfileImage = store.ProfileImage;
      console.log(this.ProfileImage);
    })
    }, 50);
    
  }

  onHomePicChanged(files) {
    const formData = new FormData();
    formData.append('HomePic', files[0], this.currentVendorID);
    this.vendorUpload.VendorHomeUpload(formData)
    .subscribe(res => {
      alert("Home Successfully updated!")
    });
    setTimeout(() => {
      this.chefDetails.chefDash(this.currentVendorID)
      .subscribe(store => {
        this.HomeImage = store.HomePic;
        console.log(this.HomeImage)
      })
    }, 50)
  }

  openAboutDialog(): void {
    const dialogRef = this.dialog.open(ChefAboutUploadComponent, {
      data: {currentVendorID: this.currentVendorID}
    })
  }


}
