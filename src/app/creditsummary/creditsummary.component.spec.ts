import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditsummaryComponent } from './creditsummary.component';

describe('CreditsummaryComponent', () => {
  let component: CreditsummaryComponent;
  let fixture: ComponentFixture<CreditsummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreditsummaryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
