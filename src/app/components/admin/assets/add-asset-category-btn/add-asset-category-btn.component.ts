import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddCategoryBtnComponent } from '@shared/add-category-btn/add-category-btn.component';

@Component({
  selector: 'app-add-asset-category-btn',
  templateUrl: './add-asset-category-btn.component.html',
  styleUrls: ['./add-asset-category-btn.component.css']
})
export class AddAssetCategoryBtnComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  toggleAdd(type): void {
    this.dialog.open(AddCategoryBtnComponent, { data: { type } });
  }
}
