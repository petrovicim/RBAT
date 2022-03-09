import { Component, OnInit } from '@angular/core';
import { ApiConnectionService } from '@services/api-connection.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material';
import { SubmitMessageComponent } from '@shared/submit-message/submit-message.component';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  userData = {
    name: '',
    email: '',
    position: '',
    department: '',
    phone: '',
    image: '',
    password: '123456',
    password_confirmation: '123456',
  };

  message: string;
  imgURL: any;
  storageData;

  constructor(
    private _service: ApiConnectionService<any>,
    private _dialog: MatDialog,
  ) { }

  ngOnInit() {
    // Get storaged data to get the user id
    this.storageData = JSON.parse(localStorage.getItem('data'));
    this.getUser(this.storageData['id']);
  }

  getUser(index): void {
    // Call service to get user info
    const cleaner = this._service.get(`${environment.base}${environment.users}${index}`).subscribe(res => {
      this.userData = res.user;
      cleaner.unsubscribe();
    },
      err => {
        console.error("ERROR getting user profile: ", err);
      });
  }

  updateUser(): void {
    // Create object with custom data
    let data = {
      name: this.userData.name,
      email: this.userData.email,
    }
    // Set user message for send it to the Submit component
    let message = 'user';
    const cleaner = this._service.put(`${environment.base}${environment.users}${this.storageData['id']}`, data).subscribe(res => {
      this.storageData['uid'] = this.userData.email;
      // Set the new uid(email) on localStorage for getting data
      localStorage.setItem('data', JSON.stringify(this.storageData));
      // Open submit component with propper data
      this._dialog.open(SubmitMessageComponent, { data: { type: 'edit', message: 'updated the ' + message } });
      this.getUser(this.storageData['id']);
      cleaner.unsubscribe();
    },
      err => {
        console.error("ERROR update user: ", err);
        // Open sumbit component when getting an error on updating user
        this._dialog.open(SubmitMessageComponent, { data: { type: 'edit', error: 'error', message: 'updated the ' + message } });
      }
    )

  }

  // Function to change photo (working only local)
  preview(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.userData.image = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
