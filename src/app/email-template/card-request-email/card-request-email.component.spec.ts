import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRequestEmailComponent } from './card-request-email.component';

describe('CardRequestEmailComponent', () => {
  let component: CardRequestEmailComponent;
  let fixture: ComponentFixture<CardRequestEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardRequestEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardRequestEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
