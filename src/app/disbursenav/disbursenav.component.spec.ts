import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisbursenavComponent } from './disbursenav.component';

describe('DisbursenavComponent', () => {
  let component: DisbursenavComponent;
  let fixture: ComponentFixture<DisbursenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DisbursenavComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisbursenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
