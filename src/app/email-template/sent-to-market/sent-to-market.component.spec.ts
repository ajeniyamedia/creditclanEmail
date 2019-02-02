import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentToMarketComponent } from './sent-to-market.component';

describe('SentToMarketComponent', () => {
  let component: SentToMarketComponent;
  let fixture: ComponentFixture<SentToMarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentToMarketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentToMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
