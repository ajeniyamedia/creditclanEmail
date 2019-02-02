import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductbasicComponent } from './productbasic.component';

describe('ProductbasicComponent', () => {
  let component: ProductbasicComponent;
  let fixture: ComponentFixture<ProductbasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductbasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductbasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
