import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddNewBtnComponent } from '@shared/add-new-btn/add-new-btn.component';

@Component({
  selector: 'app-add-new-asset-btn',
  templateUrl: './add-new-asset-btn.component.html',
  styleUrls: ['./add-new-asset-btn.component.css']
})
export class AddNewAssetBtnComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  toggleAdd(type): void {
    this.dialog.open(AddNewBtnComponent, { data: { type } });
  }
}
