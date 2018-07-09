import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentrateComponent } from './investmentrate.component';

describe('InvestmentrateComponent', () => {
  let component: InvestmentrateComponent;
  let fixture: ComponentFixture<InvestmentrateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InvestmentrateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
