import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncludedcompaniesComponent } from './includedcompanies.component';

describe('IncludedcompaniesComponent', () => {
  let component: IncludedcompaniesComponent;
  let fixture: ComponentFixture<IncludedcompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncludedcompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncludedcompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
