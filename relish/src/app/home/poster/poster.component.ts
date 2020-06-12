import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { authService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.css']
})
export class PosterComponent implements OnInit {

  constructor(private router: Router, private authService: authService) { }

  @Output() myEvent = new EventEmitter();
  ngOnInit(): void {
  }

  GoToVendorPage() {
    this.router.navigate(['VendorPage'])
    this.authService.changeVendorPageStatus(true);
  }
}
