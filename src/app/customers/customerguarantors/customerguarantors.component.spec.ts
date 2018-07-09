import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerguarantorsComponent } from './customerguarantors.component';

describe('CustomerguarantorsComponent', () => {
  let component: CustomerguarantorsComponent;
  let fixture: ComponentFixture<CustomerguarantorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerguarantorsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerguarantorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
