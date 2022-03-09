import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewUserBtnComponent } from './add-new-user-btn.component';

describe('AddNewUserBtnComponent', () => {
  let component: AddNewUserBtnComponent;
  let fixture: ComponentFixture<AddNewUserBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewUserBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewUserBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
