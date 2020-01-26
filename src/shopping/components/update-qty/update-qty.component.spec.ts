import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQtyComponent } from './update-qty.component';

describe('UpdateQtyComponent', () => {
  let component: UpdateQtyComponent;
  let fixture: ComponentFixture<UpdateQtyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateQtyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateQtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
