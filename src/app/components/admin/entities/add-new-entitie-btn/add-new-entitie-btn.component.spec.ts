import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewEntitieBtnComponent } from './add-new-entitie-btn.component';

describe('AddNewEntitieBtnComponent', () => {
  let component: AddNewEntitieBtnComponent;
  let fixture: ComponentFixture<AddNewEntitieBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewEntitieBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewEntitieBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
