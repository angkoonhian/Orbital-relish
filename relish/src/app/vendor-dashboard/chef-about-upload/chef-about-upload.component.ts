import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { VendorUpload } from '../../services/vendor-Upload';

@Component({
  selector: 'app-chef-about-upload',
  templateUrl: './chef-about-upload.component.html',
  styleUrls: ['./chef-about-upload.component.css']
})
export class ChefAboutUploadComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private VendorUpload: VendorUpload) { }

  @ViewChild('updateAbout') LoginForm: NgForm;

  About = {
    currentVendorID: '',
    AboutUpdate: ''
  };
  ngOnInit(): void {
    console.log(this.data.currentVendorID);
  }

  UpdateAbout() {
    this.About.currentVendorID = this.data.currentVendorID;
    this.About.AboutUpdate = this.LoginForm.value.UpdateAbout.About;
    this.VendorUpload.VendorAboutUpload(this.About)
    .subscribe(res => {
      alert("Successfully updated!")
    },
    error => {
      alert("Error in updating!")
    })
    this.LoginForm.reset();
  }

}
