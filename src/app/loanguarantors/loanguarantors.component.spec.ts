import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanguarantorsComponent } from './loanguarantors.component';

describe('LoanguarantorsComponent', () => {
  let component: LoanguarantorsComponent;
  let fixture: ComponentFixture<LoanguarantorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoanguarantorsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanguarantorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
