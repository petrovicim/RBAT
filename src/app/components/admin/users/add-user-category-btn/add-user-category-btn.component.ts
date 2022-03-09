import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddCategoryBtnComponent } from '@shared/add-category-btn/add-category-btn.component';

@Component({
  selector: 'app-add-user-category-btn',
  templateUrl: './add-user-category-btn.component.html',
  styleUrls: ['./add-user-category-btn.component.scss']
})
export class AddUserCategoryBtnComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  toggleAdd(type): void {
    this.dialog.open(AddCategoryBtnComponent, { data: { type } });
  }
}
