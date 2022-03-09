import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AssetHistoryComponent } from '../asset-history/asset-history.component';
import { environment } from '@environment';
import { ApiConnectionService } from '@services/api-connection.service';
import { PostService } from '@services/post-service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
import { QRCodeComponent } from '@shared/QR-code/QR-code.component';
import { EditCategoryDialogComponent } from '@shared/edit-category-dialog/edit-category-dialog.component';
import { EditDataDialogComponent } from '@shared/edit-data-dialog/edit-data-dialog.component';
import { DeleteDialogComponent } from '@shared/delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-assets-table',
  templateUrl: './assets-table.component.html',
  styleUrls: ['./assets-table.component.scss'],
})
export class AssetsTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'more'];

  indexes = {
    category_index: '',
    asset_index: '',
    current_qr: '',
  };
  assetTypes;
  assetsList = [];
  componentInput;
  admin: boolean;
  getLatest: Subscription;
  dataSource = new MatTableDataSource<any>(this.assetTypes);


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _service: ApiConnectionService<any>, private _dataService: PostService<any>, private dialog: MatDialog) {
    // Call get functions every time the user call a service to the endpoint
    this.getLatest = _dataService.returnSubj().subscribe(() => {
      this.getAssetTypes();
      this.getAssets(this.indexes.category_index);
    });
  }

  // On initialization the search bar get empty string & there are called get functions
  ngOnInit() {
    this.componentInput = '';
    this.getAssetTypes();
    this.applyFilter(this.componentInput);
    let data = JSON.parse(localStorage.getItem('data'));
    if (data['role'] === 'admin') {
      this.admin = true;
    }
  }

  // Get tab index for displaying data from that category
  getTabIndex(index) {
    const currentCategory = this.assetTypes[index.index];
    this.indexes.category_index = currentCategory.uid;
    this.getAssets(currentCategory.uid);
  }

  // Get asset category types
  getAssetTypes(): void {
    const cleaner = this._service.get(`${environment.base}${environment.assets_types}`).subscribe((res: any) => {
      this.assetTypes = res.asset_types;
      cleaner.unsubscribe();
    },
      err => console.error('GET asset types error: ', err),
    );
  }

  // Get the qr code for certain asset
  viewQRCode(index) {
    const cleaner = this._service.get(`${environment.base}${environment.assets_types}${this.indexes.category_index}${environment.assets}${index}`).subscribe((res: any) => {
      this.indexes.current_qr = res.asset.qr_code_path;
      // Open component to show the qr code
      this.dialog.open(QRCodeComponent, { data: this.indexes.current_qr });
      cleaner.unsubscribe();
    },
      err => console.error('GET qr code by id error: ', err),
    );
  }

  // Get the assets for a certain category
  getAssets(index) {
    const cleaner = this._service.get(`${environment.base}${environment.assets_types}${index}`).subscribe((res: any) => {
      this.assetsList = res.asset_type.assets;
      // Populate the table
      this.dataSource = new MatTableDataSource<any>(this.assetsList);
      // Implement pagination for the table
      this.dataSource.paginator = this.paginator;
      cleaner.unsubscribe();
    },
      err => console.error('GET assets by id error: ', err),
    );
  }

  // Search on the table
  applyFilter(filterValue: string) {
    this.getLatest = this._dataService.getData.subscribe((res: any) => {
      filterValue = res;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    },
      err => console.error('GET data from service for applying filter error: ', err),
    );
    // Show on the first page 
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  assetHistory(index) {
    this.indexes.asset_index = index;
    this.dialog.open(AssetHistoryComponent, { data: { index: this.indexes.asset_index, catIndex: this.indexes.category_index } });
  }

  editAsset(index) {
    this.indexes.asset_index = index;
    this.dialog.open(EditDataDialogComponent, { data: { index: this.indexes.asset_index, type: 'Asset', catIndex: this.indexes.category_index } });
  }

  editCategory(index) {
    this.dialog.open(EditCategoryDialogComponent, { data: { index, type: 'asset' } });
  }

  deleteCategory(index) {
    this.dialog.open(DeleteDialogComponent, { data: { catIndex: this.indexes.category_index, type: 'asset category' } });
  }

  deleteAsset(index) {
    this.indexes.asset_index = index;
    this.dialog.open(DeleteDialogComponent, { data: { catIndex: this.indexes.category_index, type: 'asset', index: this.indexes.asset_index } });
  }

  // Track the input index for not losing focus
  trackByFn(index: any) {
    return index;
  }

  ngOnDestroy() {
    this.getLatest.unsubscribe();
  }

}
