import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanlendersComponent } from './loanlenders.component';

describe('LoanlendersComponent', () => {
  let component: LoanlendersComponent;
  let fixture: ComponentFixture<LoanlendersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoanlendersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanlendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
