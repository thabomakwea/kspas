import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProductsComponent } from './products.component';

describe('UserProductsComponent', () => {
  let component: UserProductsComponent;
  let fixture: ComponentFixture<UserProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
