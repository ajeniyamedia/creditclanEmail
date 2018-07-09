import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoandocumentComponent } from './loandocument.component';

describe('LoandocumentComponent', () => {
  let component: LoandocumentComponent;
  let fixture: ComponentFixture<LoandocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoandocumentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoandocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
