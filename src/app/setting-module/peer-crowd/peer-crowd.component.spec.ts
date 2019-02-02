import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeerCrowdComponent } from './peer-crowd.component';

describe('PeerCrowdComponent', () => {
  let component: PeerCrowdComponent;
  let fixture: ComponentFixture<PeerCrowdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeerCrowdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeerCrowdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
