import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddCategoryBtnComponent } from '@shared/add-category-btn/add-category-btn.component';

@Component({
  selector: 'app-add-entitie-category-btn',
  templateUrl: './add-entitie-category-btn.component.html',
  styleUrls: ['./add-entitie-category-btn.component.css']
})
export class AddEntitieCategoryBtnComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  toggleAdd(type): void {
    this.dialog.open(AddCategoryBtnComponent, { data: { type } });
  }
}
