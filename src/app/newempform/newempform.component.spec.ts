import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewempformComponent } from './newempform.component';

describe('NewempformComponent', () => {
  let component: NewempformComponent;
  let fixture: ComponentFixture<NewempformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewempformComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewempformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
