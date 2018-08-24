import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractofferComponent } from './contractoffer.component';

describe('ContractofferComponent', () => {
  let component: ContractofferComponent;
  let fixture: ComponentFixture<ContractofferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractofferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
