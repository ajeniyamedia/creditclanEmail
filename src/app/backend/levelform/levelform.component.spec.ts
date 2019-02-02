import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelformComponent } from './levelform.component';

describe('LevelformComponent', () => {
  let component: LevelformComponent;
  let fixture: ComponentFixture<LevelformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
