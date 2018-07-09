import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorroweridComponent } from './borrowerid.component';

describe('BorroweridComponent', () => {
  let component: BorroweridComponent;
  let fixture: ComponentFixture<BorroweridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BorroweridComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorroweridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
