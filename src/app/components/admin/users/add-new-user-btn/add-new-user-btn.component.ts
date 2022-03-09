import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddNewBtnComponent } from '@shared/add-new-btn/add-new-btn.component';

@Component({
  selector: 'app-add-new-user-btn',
  templateUrl: './add-new-user-btn.component.html',
  styleUrls: ['./add-new-user-btn.component.scss']
})
export class AddNewUserBtnComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
  toggleAdd(type): void {
    this.dialog.open(AddNewBtnComponent, { data: { type } });
  }
}
