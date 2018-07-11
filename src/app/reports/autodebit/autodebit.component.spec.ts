import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutodebitComponent } from './autodebit.component';

describe('AutodebitComponent', () => {
  let component: AutodebitComponent;
  let fixture: ComponentFixture<AutodebitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutodebitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutodebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
