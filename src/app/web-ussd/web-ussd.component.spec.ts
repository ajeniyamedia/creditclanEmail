import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebUssdComponent } from './web-ussd.component';

describe('WebUssdComponent', () => {
  let component: WebUssdComponent;
  let fixture: ComponentFixture<WebUssdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebUssdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebUssdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
