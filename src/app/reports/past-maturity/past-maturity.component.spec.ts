import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastMaturityComponent } from './past-maturity.component';

describe('PastMaturityComponent', () => {
  let component: PastMaturityComponent;
  let fixture: ComponentFixture<PastMaturityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastMaturityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastMaturityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
