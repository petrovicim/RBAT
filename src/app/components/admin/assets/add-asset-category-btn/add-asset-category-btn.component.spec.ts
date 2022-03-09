import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssetCategoryBtnComponent } from './add-asset-category-btn.component';

describe('AddCategoryBtnComponent', () => {
  let component: AddAssetCategoryBtnComponent;
  let fixture: ComponentFixture<AddAssetCategoryBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddAssetCategoryBtnComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssetCategoryBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
