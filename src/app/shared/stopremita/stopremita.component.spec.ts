import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopremitaComponent } from './stopremita.component';

describe('StopremitaComponent', () => {
  let component: StopremitaComponent;
  let fixture: ComponentFixture<StopremitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopremitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopremitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
