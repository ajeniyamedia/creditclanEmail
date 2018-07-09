import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewguarantorComponent } from './viewguarantor.component';

describe('ViewguarantorComponent', () => {
  let component: ViewguarantorComponent;
  let fixture: ComponentFixture<ViewguarantorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewguarantorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewguarantorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
