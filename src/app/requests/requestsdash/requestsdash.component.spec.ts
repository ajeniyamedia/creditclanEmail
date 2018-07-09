import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsdashComponent } from './requestsdash.component';

describe('RequestsdashComponent', () => {
  let component: RequestsdashComponent;
  let fixture: ComponentFixture<RequestsdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
