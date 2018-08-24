import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankslistComponent } from './bankslist.component';

describe('BankslistComponent', () => {
  let component: BankslistComponent;
  let fixture: ComponentFixture<BankslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
