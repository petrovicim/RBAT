import { Component, OnInit, Inject } from '@angular/core';
import { environment } from '@environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '@data';

@Component({
  selector: 'app-QR-code',
  templateUrl: './QR-code.component.html',
  styleUrls: ['./QR-code.component.scss']
})
export class QRCodeComponent implements OnInit {

  QRpath;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<QRCodeComponent>
  ) { }

  ngOnInit() {
    this.getModalRef();
  }

  getModalRef() {
    this.QRpath = environment.QR_path + this.data;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
