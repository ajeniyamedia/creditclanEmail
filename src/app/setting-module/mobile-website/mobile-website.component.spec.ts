import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileWebsiteComponent } from './mobile-website.component';

describe('MobileWebsiteComponent', () => {
  let component: MobileWebsiteComponent;
  let fixture: ComponentFixture<MobileWebsiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileWebsiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
