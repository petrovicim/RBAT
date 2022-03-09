import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryBtnComponent } from './add-category-btn.component';

describe('AddCategoryBtnComponent', () => {
  let component: AddCategoryBtnComponent;
  let fixture: ComponentFixture<AddCategoryBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCategoryBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCategoryBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
