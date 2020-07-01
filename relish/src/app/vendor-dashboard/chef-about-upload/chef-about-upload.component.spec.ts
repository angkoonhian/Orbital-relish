import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefAboutUploadComponent } from './chef-about-upload.component';

describe('ChefAboutUploadComponent', () => {
  let component: ChefAboutUploadComponent;
  let fixture: ComponentFixture<ChefAboutUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChefAboutUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefAboutUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
