import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiConnectionService } from '@services/api-connection.service';
import { environment } from '@environment';
import { PostService } from '@services/post-service';
import { SubmitMessageComponent } from '@shared/submit-message/submit-message.component';
import { DialogData } from '@data';


@Component({
  selector: 'app-add-category-btn',
  templateUrl: './add-category-btn.component.html',
  styleUrls: ['./add-category-btn.component.scss']
})
export class AddCategoryBtnComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _service: ApiConnectionService<any>,
    private _dataService: PostService<any>,
    private _dialog: MatDialog,
    private _dialogRef: MatDialogRef<AddCategoryBtnComponent>,
  ) { }

  attribute = {
    attribute_state: false,
    sub_category_state: false,
    min_attribute_state: false,
  };
  newCategory = {
    name: '',
    attributes: [],
    entity_type_ids: [],
    entities_name: [],
    users_ids: [],
    users_name: [],
  };
  entities = new FormControl();
  users = new FormControl();
  usersList = [];
  entitiesList = [];

  // Send data to the data Service when the dialog is closed by clicking outside it
  send_data = this._dialogRef.afterClosed().subscribe(result => {
    this._dataService.newCategory = this.newCategory;
    this.send_data.unsubscribe();
  },
    err => console.error('SEND data to service error: ', err),
  );

  // Check if the user accidentally close the dialog and reopen it with those dates
  ngOnInit() {
    this.entities.setValue('');
    const keepData = this._dataService.newCategory;
    if (keepData && keepData.attributes.length) {
      this.attribute.sub_category_state = true;
      this.attribute.min_attribute_state = true;
    }
    this.newCategory = {
      name: keepData ? keepData.name : '',
      attributes: keepData ? keepData.attributes : [],
      entity_type_ids: keepData ? keepData.entity_type_ids : [],
      entities_name: keepData ? keepData.entities_name : [],
      users_ids: keepData ? keepData.users_ids : [],
      users_name: keepData ? keepData.users_name : [],

    };
    this.entities.setValue(this.newCategory.entities_name);
    this.users.setValue(this.newCategory.users_name);
    this.checkAttributesLength();
    this.getEntities();
    this.getUsers();
  }

  closeDialog(): void {
    this._dialogRef.close();
    this.resetForm();
  }

  // Add empty string as the next attribute for a category and bind on him
  addFields(): void {
    this.attribute.sub_category_state = true;
    this.newCategory.attributes.push('');
    this.checkAttributesLength();
    this.attribute.min_attribute_state = true;
  }

  // Check if there are attributes and show label with those ones
  checkAttributesLength() {
    if (this.newCategory.attributes.length > 0) {
      this.attribute.attribute_state = true;
    } else {
      this.attribute.attribute_state = false;
    }
  }

  // Reset the category
  resetForm(): void {
    this.attribute.sub_category_state = false;
    this.newCategory = {
      name: '',
      attributes: [],
      entity_type_ids: [],
      entities_name: [],
      users_ids: [],
      users_name: [],
    };
    // Hide label 
    this.checkAttributesLength();
  }

  // Add the new category
  addNewCategory(): void {
    let route;
    let data;

    // Check if the user is on assets or entities & create the path and the data

    switch (this.data.type) {
      case 'asset':
        route = environment.base + environment.assets_types;
        data = {
          name: this.newCategory.name,
          asset_attributes: this.newCategory.attributes
        };
        break;
      case 'entity':
        route = environment.base + environment.entity_types;
        data = {
          name: this.newCategory.name,
          entity_attributes: this.newCategory.attributes
        };
        break;
      case 'entity-child':
        route = environment.base + environment.entity_types + this.data.catIndex + environment.entities;
        data = {
          parent_uid: this.data.index,
          name: this.newCategory.name,
        }
        break;
      case 'user':
        for (let i = 0; i < this.entitiesList.length; i++) {
          for (let j = 0; j < this.entities.value.length; j++) {
            if (this.entitiesList[i].name === this.entities.value[j]) {
              this.newCategory.entity_type_ids.push(this.entitiesList[i].id);
            }
          }
        }
        for (let i = 0; i < this.usersList.length; i++) {
          for (let j = 0; j < this.users.value.length; j++) {
            if (this.usersList[i].email === this.users.value[j]) {
              this.newCategory.users_ids.push(this.usersList[i].id);
            }
          }
        }
        route = environment.base + environment.groups;
        data = {
          name: this.newCategory.name,
          entity_type_ids: this.newCategory.entity_type_ids,
          user_ids: this.newCategory.users_ids,
        };
        break;
      default:
        break;
    }
    data.user_ids.push(1);
    console.log(data);

    // Post the data
    const cleaner = this._service.post(route, data).subscribe((res: any) => {
      this._dialogRef.close();
      // Open component for submitting the message if the new category was added
      this._dialog.open(SubmitMessageComponent, { data: { type: 'category' } });
      this._dataService.trig();
      this.resetForm();
      cleaner.unsubscribe();
    },
      err => {
        this._dialogRef.close();
        // Open the component with error message
        this._dialog.open(SubmitMessageComponent, { data: { error: 'error', type: this.data.type } });
        console.error('POST category' + this.data.type + 'ERROR: ', err);
      },
    );
    this.getAssetTypes();
  }

  // Delete an attribute from the category 
  deleteAttribute(index): void {
    this.newCategory.attributes.splice(index, 1);
    if (this.newCategory.attributes.length < 1) {
      this.attribute.min_attribute_state = false;
      this.checkAttributesLength();
    }
  }

  // Get all the categories 
  getAssetTypes(): void {
    const cleaner = this._service.get(`${environment.base}${environment.assets_types}`).subscribe((res: any) => {
      cleaner.unsubscribe();
    },
      err => console.error('GET assets types error: ', err),
    );
  }

  // Get entities for assign them to the group of user
  getEntities(): void {
    this._service.get(`${environment.base}${environment.entity_types}`).subscribe(res => {
      this.entitiesList = res.entity_types;
    },
      err => console.error("ERROR getting entities for adding new group", err),

    );
  }

  // Get all users for show them in multiple select 
  getUsers(): void {
    this._service.get(`${environment.base}${environment.users}`).subscribe(res => {
      this.usersList = res.users;
    },
      err => console.error("ERROR getting users for adding new group", err),
    );
  }

  // Copy selected option in new category
  getSelected(): void {
    this.newCategory.entities_name = this.entities.value;
    this.newCategory.users_name = this.users.value;
  }

  // Focus on clicked input
  trackByFn(index: any) {
    return index;
  }
}
