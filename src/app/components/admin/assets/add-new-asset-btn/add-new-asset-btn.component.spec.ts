import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewAssetBtnComponent } from './add-new-asset-btn.component';

describe('AddNewAssetBtnComponent', () => {
  let component: AddNewAssetBtnComponent;
  let fixture: ComponentFixture<AddNewAssetBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewAssetBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewAssetBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
