import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReversetransactionComponent } from './reversetransaction.component';

describe('ReversetransactionComponent', () => {
  let component: ReversetransactionComponent;
  let fixture: ComponentFixture<ReversetransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReversetransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReversetransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
