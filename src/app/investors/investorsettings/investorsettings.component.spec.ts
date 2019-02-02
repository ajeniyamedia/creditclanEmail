import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorsettingsComponent } from './investorsettings.component';

describe('InvestorsettingsComponent', () => {
  let component: InvestorsettingsComponent;
  let fixture: ComponentFixture<InvestorsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
