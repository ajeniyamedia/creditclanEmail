import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsettingsComponent } from './productsettings.component';

describe('ProductsettingsComponent', () => {
  let component: ProductsettingsComponent;
  let fixture: ComponentFixture<ProductsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
