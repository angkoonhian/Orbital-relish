import { Component, OnInit } from '@angular/core';
import { authService } from '../services/auth-service';
import { Vendor } from '../services/Vendor-model';
import { HttpClient } from '@angular/common/http';
import { Dishes } from './Dishes.module';
import { map } from 'rxjs/operators';
import { Order } from '../services/Order-model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginDialogComponent } from '../header/login-dialog/login-dialog.component';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {

  Menu: Dishes[] = [];
  Orders: Order[] = [];
  newOrder: Order;
  subTotal = 0;

  currentStoreID = '';
  currentStore: Vendor;
  UserisLoggedIn: boolean;
  finalOrder = {
    totalSum: 0,
    orders: '',
    location: '' 
  }

  constructor(private authservice: authService, private http: HttpClient, private dialog: MatDialog) {
    this.authservice.UserLoggedIn.subscribe((state: boolean) => {this.UserisLoggedIn = state});
  }

  ngOnInit(): void {
    this.authservice.StoreID.subscribe(store => this.currentStoreID = store);
    this.http.post<any>('http://relish.dyndns-remote.com/RelishBackend/Store.php', this.currentStoreID)
    .subscribe(store => {
      this.currentStore = store;
      console.log(store["VendorName"]);
    })
    this.fetchMenu();
  }

  private fetchMenu() {
    this.OnFetchMenu();
  }

  public OnFetchMenu() {
    this.http.post('http://relish.dyndns-remote.com/RelishBackend/VendorMenu.php', this.currentStoreID)
    .pipe(
         map(responseData => {
           var i;
           var responseDataLength = Object.keys(responseData).length;
           const DishArray = [];
           for (i=0; i<responseDataLength; i++) {
             DishArray.push(responseData[i]);
             console.log(DishArray);
           }
           this.Menu = DishArray;
         })
    )
    .subscribe(posts => {
      console.log(this.Menu);
    })
  }

  public addToOrder(dish: Dishes) {
    var i;
    for (i=0; i<this.Orders.length; i++) {
      if (this.Orders[i].Name === dish.Name) {
        this.Orders[i].Quantity++;
        return this.Orders;
      }
    }
    this.newOrder = new Order(dish.Name, dish.price, dish.Description, 1);
    this.Orders.push(this.newOrder);
    console.log(this.Orders);
    console.log(dish.price)
  }

  public removeOrder(dish: Dishes) {
    var i;
    for (i=0; i<this.Orders.length; i++) {
      if (this.Orders[i].Name === dish.Name) {
        this.Orders[i].Quantity--;
      }
      if (this.Orders[i].Quantity === 0) {
        this.Orders.splice(i,i);
      }
    }
  }

  public totalPrice() {
    var i;
    this.subTotal = 0;
    for (i=0; i<(this.Orders.length); i++) {
      this.subTotal = +this.subTotal + (+this.Orders[i].Price * +this.Orders[i].Quantity);
    }
  }

  checkOut() {
    if (!this.UserisLoggedIn) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      this.dialog.open(LoginDialogComponent, dialogConfig);
    } else {
      this.http.post<any>('http://relish.dyndns-remote.com/RelishBackend/checkOut.php', this.finalOrder)
    }
  }
}
