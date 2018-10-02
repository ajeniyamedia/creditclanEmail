import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshremitaComponent } from './refreshremita.component';

describe('RefreshremitaComponent', () => {
  let component: RefreshremitaComponent;
  let fixture: ComponentFixture<RefreshremitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefreshremitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefreshremitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
