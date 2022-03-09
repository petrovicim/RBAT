import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiConnectionService } from '@services/api-connection.service';
import { environment } from '@environment';
import { PostService } from '@services/post-service';
import { SubmitMessageComponent } from '@shared/submit-message/submit-message.component';
import { DialogData } from '@data';

@Component({
  selector: 'app-add-new-btn',
  templateUrl: './add-new-btn.component.html',
  styleUrls: ['./add-new-btn.component.scss']
})
export class AddNewBtnComponent implements OnInit, OnDestroy {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _service: ApiConnectionService<any>,
    private _dialog: MatDialog,
    private _dataService: PostService<any>,
    private _dialogRef: MatDialogRef<AddNewBtnComponent>
  ) {
    this.getLatest = _dataService.returnSubj().subscribe(() => {
      this.getTypes();
    },
      err => console.error('GET data from service error: ', err),
    );
  }

  category = {
    select_category_state: false,
    select_group: false,
    sub_category_attributes: [],
    index: '',
  };
  newUser = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    group_ids: [],
    group_name: [],
    category_name: [],
    role: '',
  };
  newSubcategory = {
    name: '',
    data: {},
    attributes: [],
    category: '',
    category_uid: '',
  };
  categoryList = [];
  userRoles = ['User', 'Administrator'];
  getLatest: Subscription;
  groups = new FormControl();
  role = new FormControl();

  // Send data to the data Service when the dialog is closed by clicking outside it
  send_data = this._dialogRef.afterClosed().subscribe(result => {
    this._dataService.newSubcategory = this.newSubcategory;
    this._dataService.newUser = this.newUser;
  },
    err => console.error('SEND data to service error: ', err),
  );

  // Check if the user accidentally close the dialog and reopen it with those dates
  ngOnInit() {
    this.getTypes();
    const keepData = this._dataService.newSubcategory;    // get data for subcategory of asset and entity
    const keepUser = this._dataService.newUser;           // get data for user
    if (keepData && keepData.attributes.length) {         // check if data exists
      this.category.select_category_state = true;
    }
    this.newSubcategory = {                               // assign data
      name: keepData ? keepData.name : '',
      data: keepData ? keepData.data : {},
      attributes: keepData ? keepData.attributes : [],
      category: keepData ? keepData.category : '',
      category_uid: keepData ? keepData.category_uid : '',
    };
    this.newUser = {                                      // assign data for user
      name: keepUser ? keepUser.name : '',
      email: keepUser ? keepUser.email : '',
      password: keepUser ? keepUser.password : '',
      password_confirmation: keepUser ? keepUser.password_confirmation : '',
      group_ids: keepUser ? keepUser.group_ids : [],
      group_name: keepUser ? keepUser.group_name : [],
      category_name: keepUser ? keepUser.category_name : [],
      role: keepUser ? keepUser.role : '',
    }
    this.groups.setValue(this.newUser.group_name);        // set values already selected
    // check role 
    if (this.newUser.role === 'User') {
      for (let i = 0; i < this.newUser.group_name.length; i++) {
        for (let j = 0; j < this.newUser.category_name.length; j++) {
          if (this.newUser.group_name[i] === this.newUser.category_name[j].name) {
            this.newUser.group_ids.push(this.newUser.category_name[j].id);    // put into group_ids the ids already selected after the closed dialog
          }
        }
      }
      if (this.groups.value.length > 0) {
        this.category.select_group = true;
        this.category.select_category_state = true;
      }
    } else if (this.newUser.role === 'Administrator') {
      this.category.select_group = true;
    }
  }

  closeDialog(): void {
    this._dialogRef.close();
    this.resetForm();
  }

  resetForm(): void {
    this.newSubcategory = {
      name: '',
      data: {},
      attributes: [],
      category: '',
      category_uid: '',
    };
    this.newUser = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      group_ids: [],
      group_name: [],
      category_name: [],
      role: '',
    };
    this.category.select_category_state = false;
  }

  // Select the category from the list
  selectCategory(id, index): void {
    this.newSubcategory.attributes = [];
    this.newSubcategory.category = index;
    this.newSubcategory.category_uid = id;
    // Select attributes of the clicked category
    const categoryAttributes = this.categoryList.filter(a => a.uid === id);
    switch (this.data.type) {
      case 'asset':
        categoryAttributes ? this.category.sub_category_attributes = categoryAttributes[0].asset_attributes : this.category.sub_category_attributes = [];
        break;
      case 'entity':
        categoryAttributes ? this.category.sub_category_attributes = categoryAttributes[0].entity_attributes : this.category.sub_category_attributes = [];
        break;
      case 'user':
        if (id === 'User') {
          this.newUser.role = id;
          this.category.select_group = false;
        } else {
          this.newUser.role = id;
          this.category.select_group = true;
        }
        break;
      default:
        break;
    }
    // Get the values of the attributes
    this.newSubcategory.attributes = Object.values(this.category.sub_category_attributes);
    this.category.select_category_state = true;
  }

  // Get category types
  getTypes(): void {
    let route;
    switch (this.data.type) {
      case 'asset':
        route = environment.base + environment.assets_types;
        break;
      case 'entity':
        route = environment.base + environment.entity_types;
        break;
      case 'user':
        route = environment.base + environment.groups;
        break;
      default:
        break;
    }
    const cleaner = this._service.get(route).subscribe((res: any) => {
      switch (this.data.type) {
        case 'asset':
          this.categoryList = res.asset_types;
          break;
        case 'entity':
          this.categoryList = res.entity_types;
          break;
        case 'user':
          this.categoryList = res.groups;
          this.newUser.category_name = res.groups;
          break;
        default:
          break;
      }
      this.category.index = this.newSubcategory.category;
      cleaner.unsubscribe();
    },
      err => console.error('GET subcategory types error: ', err),
    );
  }

  // Add the asset
  addNewSubcategory(): void {
    let route;
    let data;
    // Check the route and create the route & data type
    switch (this.data.type) {
      case 'asset':
        route = environment.base + environment.assets_types + this.newSubcategory.category_uid + environment.assets;
        data = {
          asset_data: this.newSubcategory.data,
        };
        break;
      case 'entity':
        route = environment.base + environment.entity_types + this.newSubcategory.category_uid + environment.entities;
        data = {
          name: this.newSubcategory.name,
          entity_data: this.newSubcategory.data
        };
        break;
      case 'user':
        route = environment.base + environment.auth;
        let role;
        if (this.newUser.role === 'User') {
          for (let i = 0; i < this.categoryList.length; i++) {
            for (let j = 0; j < this.groups.value.length; j++) {
              if (this.categoryList[i].name === this.groups.value[j]) {
                this.newUser.group_ids.push(this.categoryList[i].id);
              }
            }
          }
          role = 'user';
        }
        if (this.newUser.role !== 'User') {
          this.newUser.group_ids = [];
          role = 'admin';
        }
        data = {
          name: this.newUser.name,
          email: this.newUser.email,
          password: this.newUser.password,
          password_confirmation: this.newUser.password_confirmation,
          group_ids: this.newUser.group_ids,
          role: role,
        }
        break;
      default:
        break;
    }

    // Post data
    const cleaner = this._service.post(route, data).subscribe((res: any) => {
      let QRcode;
      this._dialogRef.close();
      this.getTypes();
      // Check for QR code
      if (this.data.type === 'asset') {
        QRcode = res.qr_code_path;
      }
      this._dataService.trig();
      this.resetForm();
      // Open the component with the new qr code
      this._dialog.open(SubmitMessageComponent, { data: { QRcode, type: this.data.type } });
      cleaner.unsubscribe();
    },
      err => {
        this._dialogRef.close();
        // Open the component with error message
        this._dialog.open(SubmitMessageComponent, { data: { error: 'error', type: this.data.type } });
        console.error('POST new asset error: ', err);
      }
    );
    this.resetForm();
  }

  getSelected(): void {
    if (this.newUser.role === 'User') {
      if (this.groups.value.length > 0) {
        this.category.select_group = true;
        this.newUser.group_name = this.groups.value;
      } else {
        this.category.select_group = false;
      }
    } else {
      this.category.select_group = true;
    }
  }

  ngOnDestroy() {
    this.getLatest.unsubscribe();
  }
}
