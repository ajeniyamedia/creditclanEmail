import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporatePeopleComponent } from './corporate-people.component';

describe('CorporatePeopleComponent', () => {
  let component: CorporatePeopleComponent;
  let fixture: ComponentFixture<CorporatePeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporatePeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporatePeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
