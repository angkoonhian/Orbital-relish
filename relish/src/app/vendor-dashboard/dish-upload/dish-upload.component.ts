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

  selectedFile: any;
  public imagePath;
  imgURL: any;
  public message: string;
  Dish = {
    VendorID: '',
    Name: '',
    Price:'',
    Description: '',
  };

  @ViewChild('VU', { static: false }) UploadForm: NgForm;

  onFileChanged(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
    console.log(files);
    this.selectedFile = files[0];
  }

  onUploadDish() {
    this.Dish.Name = this.UploadForm.value.DishData.DishName;
    this.Dish.Price = this.UploadForm.value.DishData.Price;
    this.Dish.Description = this.UploadForm.value.DishData.Description;
    const formData = new FormData();
    const dataString = this.Dish.Name+'-'+this.Dish.Price+'-'+this.Dish.Description+'-'+this.currentVendorID
    formData.append('DishImage', this.selectedFile, dataString);
    // formData.append('VendorID', this.currentVendorID);
    // formData.append('Name', this.Dish.Name);
    // formData.append('Price', this.Dish.Price);
    // formData.append('Description', this.Dish.Description);
    console.log(formData)
    this.Dish.VendorID = this.currentVendorID;
    const param = {"VendorID": this.currentVendorID, "Name": this.Dish.Name, "Price": this.Dish.Price, 
      "Description": this.Dish.Description, DishImage: formData}
    this.dishUpload.VendorUploadDish(formData)
    .subscribe(res => {
        console.log(res);
    })
    this.UploadForm.reset();
  }
}
