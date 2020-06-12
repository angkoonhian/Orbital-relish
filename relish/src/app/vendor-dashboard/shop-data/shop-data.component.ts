import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shop-data',
  templateUrl: './shop-data.component.html',
  styleUrls: ['./shop-data.component.css']
})
export class ShopDataComponent implements OnInit {

  @Input() currentVendorID: string;

  constructor() { }

  ngOnInit(): void {
  }

}
