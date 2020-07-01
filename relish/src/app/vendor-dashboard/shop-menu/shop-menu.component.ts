import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Dishes } from './Dishes.module';

@Component({
  selector: 'app-shop-menu',
  templateUrl: './shop-menu.component.html',
  styleUrls: ['./shop-menu.component.css']
})
export class ShopMenuComponent implements OnInit {

  @Input() currentVendorID: string;

  Menu: Dishes[] = [];
  DishID = '';
  DishImage = 'http://relish.dyndns-remote.com/RelishBackend/';
  Store = {
    VendorID: ''
  }
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchMenu();
  }

  private fetchMenu() {
    this.OnFetchMenu();
  }

  public OnFetchMenu() {
    this.Store.VendorID = this.currentVendorID
    this.http.post('http://relish.dyndns-remote.com/RelishBackend/ChefMenu.php', this.Store)
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

  public OnDeleteDish(DishID) {
    this.http.post('http://localhost/RelishBackend/DeleteDish.php', DishID)
    .subscribe(result => {
      console.log(result);
    })
    this.fetchMenu();
  }
}
