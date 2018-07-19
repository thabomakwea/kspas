import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDependentsComponent } from './dependents.component';

describe('UserDependentsComponent', () => {
  let component: UserDependentsComponent;
  let fixture: ComponentFixture<UserDependentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDependentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDependentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
