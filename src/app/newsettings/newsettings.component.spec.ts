import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsettingsComponent } from './newsettings.component';

describe('NewsettingsComponent', () => {
  let component: NewsettingsComponent;
  let fixture: ComponentFixture<NewsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
