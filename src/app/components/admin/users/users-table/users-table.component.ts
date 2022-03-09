import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { environment } from '@environment';
import { ApiConnectionService } from '@services/api-connection.service';
import { PostService } from '@services/post-service';
import { EditCategoryDialogComponent } from '@shared/edit-category-dialog/edit-category-dialog.component';
import { EditDataDialogComponent } from '@shared/edit-data-dialog/edit-data-dialog.component';
import { DeleteDialogComponent } from '@shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ transform: 'translateX(100%)', opacity: 0 }),
          animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
        ]),
        transition(':leave', [
          style({ transform: 'translateX(0)', opacity: 1 }),
          animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 }))
        ])
      ]),
  ],
})

export class UsersTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'position', 'more'];
  indexes = {
    category_index: '',
    user_index: '',
  };
  timer: Observable<any>;
  usersGroups = [];
  usersList = [];
  dataSource = new MatTableDataSource<any>(this.usersGroups);
  componentInput;
  getLatest: Subscription;
  successMessage: boolean;
  admin: boolean;
  userState = 'activated';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _service: ApiConnectionService<any>,
    private _dataService: PostService<any>,
    private dialog: MatDialog,
    private router: Router) {

    this.getLatest = _dataService.returnSubj().subscribe(() => {
      this.getUsersGroups();
      this.getUsers(this.indexes.category_index);
    });
  }

  ngOnInit() {
    this.componentInput = '';
    this.getUsersGroups();
    this.getSearchInput();
    this.dataSource.paginator = this.paginator;
    this.applyFilter(this.componentInput);
    let data = JSON.parse(localStorage.getItem('data'));
    if (data['role'] === 'admin') {
      this.admin = true;
    }
  }

  getTabIndex(index) {
    const currentCategory = this.usersGroups[index.index];
    this.indexes.category_index = currentCategory.id;
    this.getUsers(this.usersGroups[index.index].id);
  }

  getUsersGroups(): void {
    const cleaner = this._service.get(`${environment.base}${environment.groups}`).subscribe((res: any) => {
      this.usersGroups = res.groups;
      cleaner.unsubscribe();
    },
      err => console.error('GET users types error: ', err),
    );
  }

  getUsers(index) {
    const cleaner = this._service.get(`${environment.base}${environment.groups}${index}`).subscribe((res: any) => {
      this.usersList = res.group.users;
      this.dataSource = new MatTableDataSource<any>(this.usersList);
      this.dataSource.paginator = this.paginator;
      cleaner.unsubscribe();
    },
      err => console.error('GET users by id error: ', err),
    );
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

  getSearchInput() {
    const cleaner = this._dataService.getData.subscribe((res: any) => {
      this.componentInput = res;
      cleaner.unsubscribe();
    },
      err => console.error('GET data from service for search input error: ', err),
    );
  }

  openUserProfile(index) {
    if (localStorage.getItem('role') === 'admin') {
      this.router.navigate(['users/', index]);
    }
  }

  setTimer() {
    switch (this.userState) {
      case 'activated':
        this.userState = 'de-activated';
        break;
      case 'de-activated':
        this.userState = 'activated';
        break;
      default:
        break;
    }
    this.successMessage = true;
    setTimeout(() => { this.successMessage = false; }, 5000);
  }

  editUser(index) {
    this.indexes.user_index = index;
    this.dialog.open(EditDataDialogComponent, { data: { index: this.indexes.user_index, type: 'User', catIndex: this.indexes.category_index } });
  }

  editCategory(index) {
    this.dialog.open(EditCategoryDialogComponent, { data: { index, type: 'user' } });
  }

  deleteCategory(index) {
    this.dialog.open(DeleteDialogComponent, { data: { catIndex: index, type: 'user category' } });
  }

  deleteUser(index) {
    this.indexes.user_index = index;
    this.dialog.open(DeleteDialogComponent, { data: { catIndex: this.indexes.category_index, type: 'user', index: this.indexes.user_index } });
  }

  trackByFn(index: any) {
    return index;
  }

  ngOnDestroy() {
    this.getLatest.unsubscribe();
  }
}
