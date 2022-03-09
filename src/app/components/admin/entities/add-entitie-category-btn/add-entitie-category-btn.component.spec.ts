import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntitieCategoryBtnComponent } from './add-entitie-category-btn.component';

describe('AddCategoryBtnComponent', () => {
  let component: AddEntitieCategoryBtnComponent;
  let fixture: ComponentFixture<AddEntitieCategoryBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEntitieCategoryBtnComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEntitieCategoryBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
