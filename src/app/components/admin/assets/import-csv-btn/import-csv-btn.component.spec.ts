import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportCsvBtnComponent } from './import-csv-btn.component';

describe('ImportCsvBtnComponent', () => {
  let component: ImportCsvBtnComponent;
  let fixture: ComponentFixture<ImportCsvBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportCsvBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportCsvBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
