import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { VendorUpload } from '../../services/vendor-Upload';
import { HttpClient } from '@angular/common/http';
import { ShopMenuComponent } from '../shop-menu/shop-menu.component';
import { Order } from '../../services/Order-model'

@Component({
  selector: 'app-current-orders',
  templateUrl: './current-orders.component.html',
  styleUrls: ['./current-orders.component.css']
})
export class CurrentOrdersComponent implements OnInit {

  constructor(private dishUpload: VendorUpload, private Http: HttpClient) { }

  @Input() currentVendorID: string;

  Orders = <any>[];
  currentStoreID = {
    VendorID: ''
  }
  OrderID = {
    OrderID: ''
  }

  private transformOrder(Orders: any) {
  }

  
  ngOnInit(): void {
    this.currentStoreID.VendorID = this.currentVendorID;
    this.Http.post<any>('http://relish.dyndns-remote.com/RelishBackend/getOrders.php', this.currentStoreID)
    .subscribe(res => {
      for (let i=0; i<res.length; i++) {
        res[i].OrderDetails = res[i].OrderDetails.split('--');
        res[i].OrderDetails.pop();
        for (let j=0; j<res[i].OrderDetails.length; j++) {
          res[i].OrderDetails[j] = res[i].OrderDetails[j].split('-');
        }
        this.Orders.push(res[i]);
      }
      console.log(this.Orders);
    })
  }

  ServingOrder(orderID: string) {
    this.OrderID.OrderID = orderID;
    this.Http.post<any>('http://relish.dyndns-remote.com/RelishBackend/changeOrderStatus.php', this.OrderID)
    .subscribe(res => {
      console.log(res)
    })
    this.Orders = <any>[];
    this.Http.post<any>('http://relish.dyndns-remote.com/RelishBackend/getOrders.php', this.currentStoreID)
    .subscribe(res => {
      for (let i=0; i<res.length; i++) {
        res[i].OrderDetails = res[i].OrderDetails.split('--');
        res[i].OrderDetails.pop();
        for (let j=0; j<res[i].OrderDetails.length; j++) {
          res[i].OrderDetails[j] = res[i].OrderDetails[j].split('-');
        }
        this.Orders.push(res[i]);
      }
      console.log(this.Orders);
    })
  }

}
