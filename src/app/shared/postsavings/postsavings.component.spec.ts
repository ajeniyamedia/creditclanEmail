import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsavingsComponent } from './postsavings.component';

describe('PostsavingsComponent', () => {
  let component: PostsavingsComponent;
  let fixture: ComponentFixture<PostsavingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsavingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsavingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
