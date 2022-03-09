import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedEntitiesComponent } from './nested-entities.component';

describe('NestedEntitiesComponent', () => {
  let component: NestedEntitiesComponent;
  let fixture: ComponentFixture<NestedEntitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NestedEntitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
