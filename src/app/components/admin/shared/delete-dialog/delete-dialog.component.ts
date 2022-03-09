import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpParams } from '@angular/common/http';
import { environment } from '@environment';
import { ApiConnectionService } from '@services/api-connection.service';
import { PostService } from '@services/post-service';
import { DialogData } from '@data';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _dialogRef: MatDialogRef<DeleteDialogComponent>,
    private _service: ApiConnectionService<any>,
    private _dataService: PostService<any>
  ) { }

  ngOnInit() {
  }

  closeDialog(): void {
    this._dialogRef.close();
  }

  deleteCategory() {
    let path;
    let params = new HttpParams();
    // Check the route, create the path & send uid as parameter
    switch (this.data.type) {
      case 'asset category':
        path = environment.base + environment.assets_types;
        params = params.append(
          'uid'.toString(),
          this.data.catIndex.toString(),
        );
        break;
      case 'asset':
        path = environment.base + environment.assets_types + this.data.catIndex + environment.assets;
        params = params.append(
          'asset_uid'.toString(),
          this.data.index.toString(),
        );
        break;
      case 'entity category':
        path = environment.base + environment.entity_types;
        params = params.append(
          'uid'.toString(),
          this.data.catIndex.toString(),
        );
        break;
      case 'child':
      case 'entity':
        path = environment.base + environment.entity_types + this.data.catIndex + environment.entities;
        params = params.append(
          'entity_uid'.toString(),
          this.data.index.toString(),
        );
        break;
      case 'user category':
        path = environment.base + environment.groups;
        params = params.append(
          'id'.toString(),
          this.data.catIndex.toString(),
        );
        break;
      default:
        break;
    }
    // Call the endpoint
    const cleaner = this._service.delete(`${path}${'?'}${params}`).subscribe((res: any) => {
      this._dataService.trig();
      this._dialogRef.close();
      cleaner.unsubscribe();
    },
      err => console.error('DELETE data from ' + this.data.type + 'error: ', err),
    );
  }
}
