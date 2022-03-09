import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';

import { ApiConnectionService } from '@services/api-connection.service';
import { PostService } from '@services/post-service';
import { environment } from '@environment';
import { EditDataDialogComponent } from '@shared/edit-data-dialog/edit-data-dialog.component';
import { EditCategoryDialogComponent } from '@shared/edit-category-dialog/edit-category-dialog.component';
import { DeleteDialogComponent } from '@shared/delete-dialog/delete-dialog.component';
import { AddCategoryBtnComponent } from '@shared/add-category-btn/add-category-btn.component';


@Component({
  selector: 'app-entities-table',
  templateUrl: './entities-table.component.html',
  styleUrls: ['./entities-table.component.scss']
})
export class EntitiesTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'more'];
  indexes = {
    category_index: '',
    entity_index: '',
  };
  entitiesList = [];
  componentInput;
  entityTypes;
  admin: boolean;
  dataSource = new MatTableDataSource<any>(this.entitiesList);
  getLatest: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private _service: ApiConnectionService<any>,
    private _dataService: PostService<any>,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute) {
    this.getLatest = _dataService.returnSubj().subscribe(() => {
      this.getEntityTypes();
      this.getEntity(this.indexes.category_index);
    });
  }

  ngOnInit() {
    this.componentInput = '';
    this.getEntityTypes();
    this.dataSource.paginator = this.paginator;
    this.applyFilter(this.componentInput);
    let data = JSON.parse(localStorage.getItem('data'));
    if (data['role'] === 'admin') {
      this.admin = true;
    }
  }

  getTabIndex(index) {
    const currentCategory = this.entityTypes[index.index];
    this.indexes.category_index = currentCategory.uid;
    this.getEntity(this.indexes.category_index);
  }

  applyFilter(filterValue: string) {
    this._dataService.getData.subscribe((res: any) => {
      filterValue = res;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    },
      err => console.error('GET data from service for applying filter error: ', err),
    );
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getEntityTypes(): void {
    const cleaner = this._service.get(`${environment.base}${environment.entity_types}`).subscribe((res: any) => {
      this.entityTypes = res.entity_types;
      cleaner.unsubscribe();
    },
      err => console.error('GET entity types error: ', err),
    );
  }

  getEntity(index) {
    const cleaner = this._service.get(`${environment.base}${environment.entity_types}${index}`).subscribe((res: any) => {
      this.entitiesList = res.entity_type.entities;
      console.log(this.entitiesList);

      this.dataSource = new MatTableDataSource<any>(this.entitiesList);
      this.dataSource.paginator = this.paginator;
      cleaner.unsubscribe();
    },
      err => console.error('GET entity by id error: ', err),
    );
  }

  editEntity(index) {
    this.indexes.entity_index = index;
    this.dialog.open(EditDataDialogComponent, { data: { index: this.indexes.entity_index, type: 'Entity', catIndex: this.indexes.category_index } });
  }

  addEntityChild(index, name) {
    this.dialog.open(AddCategoryBtnComponent, { data: { index: index, catIndex: this.indexes.category_index, type: 'entity-child', parent: name } });
  }

  redirectToNestedEntities(uid, name) {
    var myQueryParams;
    myQueryParams = [
      { id: 1, name: name, category_index: this.indexes.category_index, index: uid },
    ];
    this.router.navigate(['entities/', name], { queryParams: { filter: JSON.stringify(myQueryParams) } });
  }

  editCategory(index) {
    this.dialog.open(EditCategoryDialogComponent, { data: { index, type: 'entity' } });
  }
  deleteCategory(index) {
    this.dialog.open(DeleteDialogComponent, { data: { catIndex: this.indexes.category_index, type: 'entity category' } });
  }

  deleteEntity(index) {
    this.indexes.entity_index = index;
    this.dialog.open(DeleteDialogComponent, { data: { catIndex: this.indexes.category_index, type: 'entity', index: this.indexes.entity_index } });
  }

  trackByFn(index: any) {
    return index;
  }

  ngOnDestroy() {
    this.getLatest.unsubscribe();
  }
}
