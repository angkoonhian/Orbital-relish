import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { VendorUpload } from '../../services/vendor-Upload';
import { HttpClient } from '@angular/common/http';
import { ShopMenuComponent } from '../shop-menu/shop-menu.component';

@Component({
  selector: 'app-dish-upload',
  templateUrl: './dish-upload.component.html',
  styleUrls: ['./dish-upload.component.css']
})
export class DishUploadComponent implements OnInit {

  constructor(private dishUpload: VendorUpload, private Http: HttpClient) { }

  @Input() currentVendorID: string;

  ngOnInit(): void {
  }

  selectedFile = null;
  Dish = {
    VendorID: '',
    Name: '',
    Price:'',
    Description: '',
  };

  @ViewChild('VU', { static: false }) UploadForm: NgForm;

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  onUploadDish() {
    this.Dish.VendorID = this.currentVendorID;
    this.Dish.Name = this.UploadForm.value.DishData.DishName;
    this.Dish.Price = this.UploadForm.value.DishData.Price;
    this.Dish.Description = this.UploadForm.value.DishData.Description;
    this.dishUpload.VendorUploadDish(this.Dish)
    .subscribe(res => {
        console.log(res);
    })
    this.UploadForm.reset();
  }
}
