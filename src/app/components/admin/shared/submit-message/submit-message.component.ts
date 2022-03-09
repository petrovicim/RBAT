import { Component, OnInit, Inject } from '@angular/core';
import { environment } from '@environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '@data';

@Component({
  selector: 'app-submit-message',
  templateUrl: './submit-message.component.html',
  styleUrls: ['./submit-message.component.scss']
})
export class SubmitMessageComponent implements OnInit {

  QRpath;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<SubmitMessageComponent>
  ) { }

  ngOnInit() {
    this.getModalRef();
  }

  getModalRef() {
    this.QRpath = environment.QR_path + this.data.QRcode;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
