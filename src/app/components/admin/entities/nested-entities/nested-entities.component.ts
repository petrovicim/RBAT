import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlatformLocation } from '@angular/common'
import { Subscription } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { ApiConnectionService } from '@services/api-connection.service';
import { PostService } from '@services/post-service';
import { EditDataDialogComponent } from '@shared/edit-data-dialog/edit-data-dialog.component';
import { DeleteDialogComponent } from '@shared/delete-dialog/delete-dialog.component';
import { AddCategoryBtnComponent } from '@shared/add-category-btn/add-category-btn.component';
import { environment } from '@environment';

@Component({
  selector: 'app-nested-entities',
  templateUrl: './nested-entities.component.html',
  styleUrls: ['./nested-entities.component.scss']
})
export class NestedEntitiesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'date', 'more'];
  current = {
    category: '',
    index: '',
    name: '',
  }
  entityChildrenList = [];
  componentInput;
  admin: boolean;
  myQuery = [];

  dataSource = new MatTableDataSource<any>(this.entityChildrenList);
  getLatest: Subscription;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _service: ApiConnectionService<any>,
    private _dataService: PostService<any>,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    location: PlatformLocation) {
    this.getLatest = _dataService.returnSubj().subscribe(() => {
      this.getEntity(this.current.category, this.current.index);
    });

    // GET queryParams based on the location
    location.onPopState(() => {
      this.route.queryParams.subscribe((p: any) => {
        if (p.filter) {
          this.myQuery = JSON.parse(p.filter);
          // Get category index, index & name of the current parent
          const last = JSON.parse(p.filter).length - 1;
          this.current.category = JSON.parse(p.filter)[last]['category_index'];
          this.current.index = JSON.parse(p.filter)[last]['index'];
          this.current.name = JSON.parse(p.filter)[last]['name'];
        }
        // Get children of the current parent
        this.getEntity(this.current.category, this.current.index);
      });
    })
  }

  ngOnInit() {
    // GET queryParams when the component is initialized
    this.route.queryParams.subscribe((p: any) => {
      if (p.filter) {
        this.myQuery = JSON.parse(p.filter);
        const last = JSON.parse(p.filter).length - 1;
        this.current.category = JSON.parse(p.filter)[last]['category_index'];
        this.current.index = JSON.parse(p.filter)[last]['index'];
        this.current.name = JSON.parse(p.filter)[last]['name'];
      }
    });
    // Search input becomes empty
    this.componentInput = '';
    this.dataSource.paginator = this.paginator;
    this.applyFilter(this.componentInput);
    // Check if the one who is logged in is user or admin for access to add/edit/delete
    let data = JSON.parse(localStorage.getItem('data'));
    if (data['role'] === 'admin') {
      this.admin = true;
    }
    this.getEntity(this.current.category, this.current.index);
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


  getEntity(uid, index) {
    const cleaner = this._service.get(`${environment.base}${environment.entity_types}${uid}${environment.entities}${index}`).subscribe((res: any) => {
      this.entityChildrenList = res.entity.children;
      this.dataSource = new MatTableDataSource<any>(this.entityChildrenList);
      this.dataSource.paginator = this.paginator;
      cleaner.unsubscribe();
    },
      err => console.error('GET entity by id error: ', err),
    );
  }

  editEntity(index) {
    // Open a dialog to edit the child sending his index & his parent index
    this.dialog.open(EditDataDialogComponent, { data: { index: index, type: 'Child', catIndex: this.current.category } });
  }

  addEntityChild(index, name) {
    // Open a dialog for adding new child sending his index & his parent index
    this.dialog.open(AddCategoryBtnComponent, { data: { index: index, catIndex: this.current.category, type: 'entity-child', parent: name } });
  }

  redirectToNestedEntities(uid, name) {
    var myQueryParams = this.myQuery;
    // Create a custom queryParams
    myQueryParams.push({ id: 1, name: name, category_index: this.current.category, index: uid });
    // Navigate on the parent to see his children
    this.router.navigate(['entities/', name], { queryParams: { filter: JSON.stringify(myQueryParams) } });
    // Get current children
    this.getEntity(this.current.category, uid);
  }

  deleteEntity(index) {
    // Open a dialog sending indexes for deleting the child
    this.dialog.open(DeleteDialogComponent, { data: { catIndex: this.current.category, type: 'child', index: index } });
  }

  goToParent(index, name) {
    // Check if users clicks on the last parent & prevent him to request the same data in vain
    if (index != this.myQuery.length - 1) {
      // Get the entity of the parent clicked by user
      this.getEntity(this.myQuery[index]['category_index'], this.myQuery[index]['index']);
      // Remove all children behind from the current parent
      this.myQuery.length = index + 1;
      // Navigate to the current parent(this is the one user clicked on)
      this.router.navigate(['entities/', name], { queryParams: { filter: JSON.stringify(this.myQuery) } });
    }
  }

  // Track input of type text
  trackByFn(index: any) {
    return index;
  }

  ngOnDestroy() {
    this.getLatest.unsubscribe();
  }

}
