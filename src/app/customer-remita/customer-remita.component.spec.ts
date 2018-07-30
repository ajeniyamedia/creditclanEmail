import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRemitaComponent } from './customer-remita.component';

describe('CustomerRemitaComponent', () => {
  let component: CustomerRemitaComponent;
  let fixture: ComponentFixture<CustomerRemitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerRemitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRemitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
