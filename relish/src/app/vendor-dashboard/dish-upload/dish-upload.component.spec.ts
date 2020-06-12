import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishUploadComponent } from './dish-upload.component';

describe('DishUploadComponent', () => {
  let component: DishUploadComponent;
  let fixture: ComponentFixture<DishUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
