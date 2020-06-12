import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopDataComponent } from './shop-data.component';

describe('ShopDataComponent', () => {
  let component: ShopDataComponent;
  let fixture: ComponentFixture<ShopDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
