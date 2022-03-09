import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { environment } from '@environment';
import { ApiConnectionService } from '@services/api-connection.service';
import { PostService } from '@services/post-service';
import { DialogData } from '@data';
import { SubmitMessageComponent } from '@shared/submit-message/submit-message.component';

@Component({
  selector: 'app-edit-data-dialog',
  templateUrl: './edit-data-dialog.component.html',
  styleUrls: ['./edit-data-dialog.component.scss']
})
export class EditDataDialogComponent implements OnInit {

  edit = {
    data_keys: [],
    data_values: [],
    data_name: [],
    path: '',
    group_path: '',
    entity_name_state: false,
  };
  editUser = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    group_ids: [],
    group_name: [],
    role: '',
  };
  editedData;
  userData = {
    name: '',
    email: '',
  };
  groups = new FormControl();
  allGroups;
  userRoles = ['User', 'Administrator'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _dialogRef: MatDialogRef<EditDataDialogComponent>,
    private _service: ApiConnectionService<any>,
    private _dialog: MatDialog,
    private _dataService: PostService<any>,
  ) { }

  // Check the route & create the path
  ngOnInit() {
    this.groups.setValue('');
    switch (this.data.type) {
      case 'Asset':
        this.edit.path = environment.base + environment.assets_types + this.data.catIndex + environment.assets + this.data.index;
        break;
      case 'Child':
      case 'Entity':
        this.edit.entity_name_state = true;
        this.edit.path = environment.base + environment.entity_types + this.data.catIndex + environment.entities + this.data.index;
        break;
      case 'User':
        this.edit.path = environment.base + environment.users + this.data.index;
        this.edit.group_path = environment.base + environment.groups;
        break;
      default:
        break;
    }
    this.getAttributes();
  }

  getAttributes() {
    const cleaner = this._service.get(this.edit.path).subscribe(res => {
      // On the specific route, get keys, get values & hole data
      switch (this.data.type) {
        case 'Asset':
          this.edit.data_keys = Object.keys(res.asset.asset_data);
          this.edit.data_values = Object.values(res.asset.asset_data);
          this.editedData = res.asset;
          break;
        case 'Child':
        case 'Entity':
          this.edit.data_name = res.entity.name;
          this.edit.data_keys = Object.keys(res.entity.entity_data);
          this.edit.data_values = Object.values(res.entity.entity_data);
          this.editedData = res.entity;
          break;
        case 'User':
          let cleaner = this._service.get(this.edit.group_path).subscribe(res => {
            this.allGroups = res.groups;
            for (let i = 0; i < this.allGroups.length; i++) {
              this.editUser.group_name.push(this.allGroups[i].name);
            }
            cleaner.unsubscribe();
          },
            err => console.error("GET all groups error: ", err),
          );
          this.editUser.name = res.user.name;
          this.editUser.email = res.user.email;
          let groups = [];
          for (let i = 0; i < res.user.groups.length; i++) {
            groups.push(res.user.groups[i].name);
          }
          this.groups.setValue(groups);
          break;
        default:
          break;
      }
      cleaner.unsubscribe();
    },
      err => console.error('GET data by index error: ', err),
    );
  }

  // Send edited data to the endpoint
  saveEdited() {
    let updatedData = {};
    let message = '';
    switch (this.data.type) {
      case 'Asset':
        for (let index = 0; index < this.edit.data_keys.length; index++) {
          this.editedData.asset_data[this.edit.data_keys[index]] = this.edit.data_values[index];
        }
        const asset_data = {};
        for (const key in this.editedData.asset_data) {
          if (this.editedData.asset_data) {
            asset_data[key] = this.editedData.asset_data[key].toString();
          }
        }
        updatedData = {
          asset_data
        };
        message = 'asset';
        break;
      case 'Child':
      case 'Entity':
        for (let index = 0; index < this.edit.data_keys.length; index++) {
          this.editedData.entity_data[this.edit.data_keys[index]] = this.edit.data_values[index];
        }
        const entity_data = {};
        for (const key in this.editedData.entity_data) {
          if (this.editedData.entity_data) {
            entity_data[key] = this.editedData.entity_data[key].toString();
          }
        }
        if (this.data.type !== 'Child') {
          updatedData = {
            name: this.edit.data_name,
            entity_data
          };
          message = 'entity';
        } else {
          updatedData = {
            name: this.edit.data_name,
          };
          message = 'child';
        }
        break;
      case 'User':
        let group_ids = [];
        for (let i = 0; i < this.allGroups.length; i++) {
          for (let j = 0; j < this.groups.value.length; j++) {
            if (this.allGroups[i].name === this.groups.value[j]) {
              group_ids.push(this.allGroups[i].id);
            }
          }
        }
        updatedData = {
          name: this.editUser.name,
          email: this.editUser.email,
          group_ids: group_ids,
        }
        message = 'user';
        break;
      default:
        break;
    }
    const cleaner = this._service.put(this.edit.path, updatedData).subscribe((res: any) => {
      this._dataService.trig();
      this._dialogRef.close();
      this._dialog.open(SubmitMessageComponent, { data: { type: 'edit', message: 'updated the ' + message } });
      cleaner.unsubscribe();
    },
      err => {
        this._dialogRef.close();
        this._dialog.open(SubmitMessageComponent, { data: { type: 'edit', error: 'error', message: 'update the ' + message } });
        console.error('PUT edited data by index error: ', err);
      }
    );
    this.getAttributes();
  }

  closeDialog(): void {
    this._dialogRef.close();
  }

  trackByFn(index: any) {
    return index;
  }
}
