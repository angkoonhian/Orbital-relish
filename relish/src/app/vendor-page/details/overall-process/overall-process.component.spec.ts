import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallProcessComponent } from './overall-process.component';

describe('OverallProcessComponent', () => {
  let component: OverallProcessComponent;
  let fixture: ComponentFixture<OverallProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
