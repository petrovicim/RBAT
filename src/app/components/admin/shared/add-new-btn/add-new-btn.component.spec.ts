import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBtnComponent } from './add-new-btn.component';

describe('AddNewBtnComponent', () => {
  let component: AddNewBtnComponent;
  let fixture: ComponentFixture<AddNewBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
