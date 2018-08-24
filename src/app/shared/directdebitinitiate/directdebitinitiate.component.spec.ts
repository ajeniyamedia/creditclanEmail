import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectdebitinitiateComponent } from './directdebitinitiate.component';

describe('DirectdebitinitiateComponent', () => {
  let component: DirectdebitinitiateComponent;
  let fixture: ComponentFixture<DirectdebitinitiateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectdebitinitiateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectdebitinitiateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
