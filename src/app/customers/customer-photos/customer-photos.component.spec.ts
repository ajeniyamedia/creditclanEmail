import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPhotosComponent } from './customer-photos.component';

describe('CustomerPhotosComponent', () => {
  let component: CustomerPhotosComponent;
  let fixture: ComponentFixture<CustomerPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
