import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectdebitstatusComponent } from './directdebitstatus.component';

describe('DirectdebitstatusComponent', () => {
  let component: DirectdebitstatusComponent;
  let fixture: ComponentFixture<DirectdebitstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectdebitstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectdebitstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
