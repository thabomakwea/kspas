import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDependentComponent } from './new-dependent.component';

describe('NewDependentComponent', () => {
  let component: NewDependentComponent;
  let fixture: ComponentFixture<NewDependentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDependentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDependentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
