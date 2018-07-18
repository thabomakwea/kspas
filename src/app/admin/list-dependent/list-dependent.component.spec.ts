import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDependentComponent } from './list-dependent.component';

describe('ListDependentComponent', () => {
  let component: ListDependentComponent;
  let fixture: ComponentFixture<ListDependentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDependentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDependentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
