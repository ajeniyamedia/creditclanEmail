import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestratefloorComponent } from './interestratefloor.component';

describe('InterestratefloorComponent', () => {
  let component: InterestratefloorComponent;
  let fixture: ComponentFixture<InterestratefloorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestratefloorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestratefloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
