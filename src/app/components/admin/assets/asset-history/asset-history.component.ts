import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiConnectionService } from '@services/api-connection.service';
import { environment } from '@environment';
import { DatePipe } from '@angular/common';

export interface DialogData {
  index: string;
  catIndex: string;
}

@Component({
  selector: 'app-asset-history',
  templateUrl: './asset-history.component.html',
  styleUrls: ['./asset-history.component.scss']
})
export class AssetHistoryComponent implements OnInit {

  assetHistory = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _service: ApiConnectionService<any>,
    private dialogRef: MatDialogRef<AssetHistoryComponent>,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {
    this.getHistory();
  }

  // Get history of the selected asset & check if there is set a location &  who is using it 
  getHistory() {
    const cleaner = this._service.get(`${environment.base}${environment.assets_types}${this.data.catIndex}${environment.assets}${this.data.index}${environment.history}`).subscribe(res => {
      this.assetHistory = res.map(item => {
        // If there isn't set location & person then will display null
        if (item.current_state_data) {
          if (!item.current_state_data.Location) {
            item.current_state_data.Location = 'null';
          }
          if (!item.current_state_data['Who is using it']) {
            item.current_state_data['Who is using it'] = 'null';
          }
        }
        // Convert time by switching day with month for displaying like day,month,year
        const assetTimestamps = item.timestamp.split(' ');
        const splitDate = assetTimestamps[0].split('-');
        item.timestamp = splitDate[1] + '-' + splitDate[0] + '-' + splitDate[2] + ' ' + assetTimestamps[1];
        item.timestamp = this.datePipe.transform(item.timestamp, 'E, dd LLL yyyy HH:mm:ss');
        return item;
      },
      );
      cleaner.unsubscribe();
    },
      err => console.error('GET history of asset', err)
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
