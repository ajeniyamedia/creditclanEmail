import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductapprovalsComponent } from './productapprovals.component';

describe('ProductapprovalsComponent', () => {
  let component: ProductapprovalsComponent;
  let fixture: ComponentFixture<ProductapprovalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductapprovalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductapprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
