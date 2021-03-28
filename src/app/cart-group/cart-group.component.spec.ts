import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartGroupComponent } from './cart-group.component';

describe('CartGroupComponent', () => {
  let component: CartGroupComponent;
  let fixture: ComponentFixture<CartGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
