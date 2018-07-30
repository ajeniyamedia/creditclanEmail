import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewlevelformComponent } from './newlevelform.component';

describe('NewlevelformComponent', () => {
  let component: NewlevelformComponent;
  let fixture: ComponentFixture<NewlevelformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewlevelformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewlevelformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
