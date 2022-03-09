import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { environment } from '@environment';
import { ApiConnectionService } from '@services/api-connection.service';
import { PostService } from '@services/post-service';
import { DialogData } from '@data';
import { SubmitMessageComponent } from '@shared/submit-message/submit-message.component';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.scss']
})
export class EditCategoryDialogComponent implements OnInit {
  @Output() myEvent = new EventEmitter();

  category = {
    path: '',
    attribute_type: '',
  };
  editCategory = {
    name: '',
    attributes: [],
    entities: [],
    entity_type_ids: [],
    user_ids: [],
    users: [],
  };
  state = {
    min_attribute: false,
    attribute: false,
  };
  entities = new FormControl();
  users = new FormControl();
  usersList = [];
  entitiesList = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    private _dialog: MatDialog,
    private _service: ApiConnectionService<any>,
    private _dataService: PostService<any>,
  ) { }

  // Check the route for creating the path
  ngOnInit() {
    this.entities.setValue('');
    switch (this.data.type) {
      case 'asset':
        this.category.path = environment.base + environment.assets_types + this.data.index;
        break;
      case 'entity':
        this.category.path = environment.base + environment.entity_types + this.data.index;
        break;
      case 'user':
        this.category.path = environment.base + environment.groups + this.data.index;
        break;
      default:
        break;
    }
    this.getUsers();
    this.getCategory();
    this.getEntities();
  }

  // Add more attributes on category
  addFields(): void {
    this.editCategory.attributes.push('');
    this.checkAttributesLength();
    this.state.min_attribute = true;
  }

  // Delete attributes
  deleteAttribute(index): void {
    this.editCategory.attributes.splice(index, 1);
    if (this.editCategory.attributes.length < 1) {
      this.state.min_attribute = false;
    }
    this.checkAttributesLength();
  }

  // Check the length of the attributes
  checkAttributesLength() {
    if (this.editCategory.attributes.length > 0) {
      this.state.attribute = true;
    } else {
      this.state.attribute = false;
    }
  }

  // Get category
  getCategory() {
    const cleaner = this._service.get(this.category.path).subscribe((res: any) => {

      // Check the route & populate with certain data
      switch (this.data.type) {
        case 'asset':
          this.editCategory.name = res.asset_type.name;
          this.editCategory.attributes = Object.values(res.asset_type.asset_attributes);
          break;
        case 'entity':
          this.editCategory.name = res.entity_type.name;
          this.editCategory.attributes = Object.values(res.entity_type.entity_attributes);
          break;
        case 'user':
          this.editCategory.name = res.group.name;
          this.editCategory.entities = res.group.entity_types;
          this.editCategory.users = res.group.users;
          let entities = [];
          let users = [];
          for (let i = 0; i < this.editCategory.entities.length; i++) {
            entities.push(this.editCategory.entities[i].name)
          }
          for (let i = 0; i < this.editCategory.users.length; i++) {
            users.push(this.editCategory.users[i].email)
          }
          this.entities.setValue(entities);
          this.users.setValue(users);
          break;
        default:
          break;
      }
      cleaner.unsubscribe();
    },
      err => console.error('GET category by index error: ', err),
    );
  }

  getEntities(): void {
    this._service.get(`${environment.base}${environment.entity_types}`).subscribe(res => {
      this.entitiesList = res.entity_types;
    },
      err => console.error("ERROR getting entities for adding new group", err),

    );
  }

  getUsers(): void {
    this._service.get(`${environment.base}${environment.users}`).subscribe(res => {
      this.usersList = res.users;
    },
      err => console.error("ERROR getting users for adding new group", err),
    );
  }

  // Update the category
  updateCategory() {
    let updateData;
    switch (this.data.type) {
      case 'asset':
        updateData = { name: this.editCategory.name, asset_attributes: this.editCategory.attributes };
        break;
      case 'entity':
        updateData = { name: this.editCategory.name, entity_attributes: this.editCategory.attributes };
        break;
      case 'user':
        for (let i = 0; i < this.entitiesList.length; i++) {
          for (let j = 0; j < this.entities.value.length; j++) {
            if (this.entitiesList[i].name === this.entities.value[j]) {
              this.editCategory.entity_type_ids.push(this.entitiesList[i].id);
            }
          }
        }
        for (let i = 0; i < this.usersList.length; i++) {
          for (let j = 0; j < this.users.value.length; j++) {
            if (this.usersList[i].email === this.users.value[j]) {
              this.editCategory.user_ids.push(this.usersList[i].id);
            }
          }
        }
        updateData = { name: this.editCategory.name, entity_type_ids: this.editCategory.entity_type_ids, user_ids: this.editCategory.user_ids };
        break;
      default:
        break;
    }
    const cleaner = this._service.put(this.category.path, updateData).subscribe((res: any) => {
      this._dataService.trig();
      this._dialogRef.close();
      this._dialog.open(SubmitMessageComponent, { data: { type: 'edit', message: 'updated the category' } });
      cleaner.unsubscribe();
    },
      err => {
        this._dialogRef.close();
        this._dialog.open(SubmitMessageComponent, { data: { type: 'edit', error: 'error', message: 'update the category' } });
        console.error('PUT edited category by index error: ', err);
      });
  }

  closeDialog(): void {
    this._dialogRef.close();
  }

  // Keep focusing on the clicked input
  trackByFn(index: any) {
    return index;
  }
}
