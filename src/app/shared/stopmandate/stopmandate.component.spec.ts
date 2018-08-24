import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopmandateComponent } from './stopmandate.component';

describe('StopmandateComponent', () => {
  let component: StopmandateComponent;
  let fixture: ComponentFixture<StopmandateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopmandateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopmandateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
