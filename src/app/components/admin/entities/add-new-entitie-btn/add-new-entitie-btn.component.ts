import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddNewBtnComponent } from '@shared/add-new-btn/add-new-btn.component';

@Component({
  selector: 'app-add-new-entitie-btn',
  templateUrl: './add-new-entitie-btn.component.html',
  styleUrls: ['./add-new-entitie-btn.component.css']
})
export class AddNewEntitieBtnComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  toggleAdd(type): void {
    this.dialog.open(AddNewBtnComponent, { data: { type } });
  }
}
