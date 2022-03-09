import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserCategoryBtnComponent } from './add-user-category-btn.component';

describe('AddUserCategoryBtnComponent', () => {
  let component: AddUserCategoryBtnComponent;
  let fixture: ComponentFixture<AddUserCategoryBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserCategoryBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserCategoryBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
