import { Component, OnInit } from '@angular/core';
import { authService } from '../services/auth-service';
import { chefDetails } from '../services/chef-details';
import { HttpClient } from '@angular/common/http';
import { Dishes } from './Dishes.module';
import { map } from 'rxjs/operators';
import { Order } from '../services/Order-model';
import { vendor } from '../services/Vendor-model';
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
  subTotal = 0;
  DishImage = 'http://relish.dyndns-remote.com/RelishBackend/';

  currentStoreID = '';
  currentStore: vendor;
  UserisLoggedIn: boolean;
  currentUserID = '';
  finalOrder = {
    custID: '',
    ChefID: '',
    totalSum: 0,
    orders: '',
    location: '' ,
    dateTime: ''
  }
  curDate: Date;
  Store = {
    VendorID: ''
  }

  constructor(private authservice: authService, private http: HttpClient, private dialog: MatDialog, private chefDetails: chefDetails) {
    this.authservice.UserLoggedIn.subscribe((state: boolean) => {this.UserisLoggedIn = state});
  }

  ngOnInit(): void {
    this.authservice.UserID.subscribe(UserID => this.currentUserID = UserID)
    this.authservice.StoreID.subscribe(store => this.currentStoreID = store);
    this.chefDetails.chefDash(this.currentStoreID)
    .subscribe(store => {
      this.currentStore = store;
      console.log(store["VendorName"]);
    })
    this.Store.VendorID = this.currentStoreID;
    this.fetchMenu();
  }

  private fetchMenu() {
    this.OnFetchMenu(this.Store);
  }

  public OnFetchMenu(Vendor: {VendorID: string}) {
    this.http.post('http://relish.dyndns-remote.com/RelishBackend/ChefMenu.php', Vendor)
    .pipe(
         map(responseData => {
           var responseDataLength = Object.keys(responseData).length;
           const DishArray = [];
           for (let i=0; i<responseDataLength; i++) {
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
    for (let i=0; i<this.Orders.length; i++) {
      if (this.Orders[i].Name == dish.Name) {
        this.Orders[i].Quantity = this.Orders[i].Quantity + 1;
        return this.Orders;
      }
    }
    this.Orders.push(new Order(dish.Name, dish.price, dish.Description, 1));
    console.log(this.Orders[0].Quantity);
  }

  public removeOrder(dish: Dishes) {
    for (let i=0; i<this.Orders.length; i++) {
      if (this.Orders[i].Name === dish.Name) {
        this.Orders[i].Quantity--;
      }
      if (this.Orders[i].Quantity === 0) {
        this.Orders.splice(i,i);
      }
    }
  }

  public totalPrice() {
    this.subTotal = 0;
    for (let i=0; i<(this.Orders.length); i++) {
      this.subTotal = +this.subTotal + (+this.Orders[i].Price * +this.Orders[i].Quantity);
    }
  }

  checkOut() {
    
    if (!this.UserisLoggedIn) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      this.dialog.open(LoginDialogComponent, dialogConfig);
    } else {
      this.finalOrder.ChefID = this.currentStoreID;
      this.finalOrder.custID = this.currentUserID;
      this.finalOrder.totalSum = this.subTotal;
      for (let i = 0; i<this.Orders.length; i++) {
        this.finalOrder.orders += this.Orders[i].Name+'-'+this.Orders[i].Price+'-'+this.Orders[i].Quantity+'--';
      }
      this.curDate = new Date();
      this.finalOrder.dateTime = this.curDate.toISOString().slice(0, 19).replace('T', ' ')
      console.log(this.finalOrder);
      this.http.post<any>('http://relish.dyndns-remote.com/RelishBackend/checkOut.php', this.finalOrder)
      .subscribe(res => {
        console.log(res)
      })
      alert("Order has been successfully sent!")
    }
  }
}
